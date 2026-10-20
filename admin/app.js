// JP MOD PORTAL Admin Studio - Frontend Logic

let allPosts = [];
let currentEditingPostId = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPostEditor();
  initImageUploads();
  initAiModal();
  initPublishModal();

  // 初回データ読み込み
  loadPostsData();
  checkGitStatus();

  // 1分ごとにGitステータスをチェック
  setInterval(checkGitStatus, 60000);
});

// --- ナビゲーション & ビュー切り替え ---
function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item[data-view]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });

  document.getElementById('btn-header-new-post')?.addEventListener('click', () => {
    openEditorForNew();
  });

  document.getElementById('btn-refresh-data')?.addEventListener('click', () => {
    loadPostsData();
    checkGitStatus();
  });

  // グローバル関数として公開（HTMLボタン用）
  window.insertTag = (before, after) => {
    const textarea = document.getElementById('form-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const replacement = before + (selected || '') + after;

    textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    textarea.focus();
    textarea.selectionStart = start + before.length;
    textarea.selectionEnd = start + before.length + (selected ? selected.length : 0);

    updateLivePreview();
  };
}

function switchView(viewId) {
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => btn.classList.remove('active'));

  const targetPanel = document.getElementById(viewId);
  const targetNav = document.querySelector(`.sidebar-nav .nav-item[data-view="${viewId}"]`);

  if (targetPanel) targetPanel.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  const titleMap = {
    'dashboard-view': '記事管理ダッシュボード',
    'editor-view': currentEditingPostId ? '記事の編集' : '新規記事の作成',
    'analytics-view': 'アクセス解析・足跡'
  };
  const pageTitle = document.getElementById('page-title');
  if (pageTitle && titleMap[viewId]) pageTitle.textContent = titleMap[viewId];
}

// --- 記事一覧データ取得 & テーブルレンダリング ---
async function loadPostsData() {
  try {
    const res = await fetch('/api/posts');
    const data = await res.json();
    if (data.success) {
      allPosts = data.posts || [];
      renderPostsTable(allPosts);
      updateKpis(allPosts);
    }
  } catch (err) {
    console.error('記事読み込みエラー:', err);
  }
}

function renderPostsTable(posts) {
  const tbody = document.getElementById('posts-table-body');
  if (!tbody) return;

  if (posts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: #64748b;">記事がまだありません。「新規記事を作成」ボタンから作成できます。</td></tr>`;
    return;
  }

  tbody.innerHTML = posts.map(p => `
    <tr>
      <td>
        <img src="${p.featuredImage || '/images/dead-age-hero.png'}" alt="${p.title}" class="table-thumb" onerror="this.src='/images/dead-age-hero.png'">
      </td>
      <td>
        <div class="table-post-title">${escapeHtml(p.title)}</div>
        <div class="table-post-game">🎮 ${escapeHtml(p.game)} (ID: <code>${escapeHtml(p.id)}</code>)</div>
      </td>
      <td>
        <span class="badge badge-cat">${escapeHtml(p.category || '未分類')}</span>
      </td>
      <td>
        <strong>${escapeHtml(p.version || 'Ver 1.0')}</strong>
      </td>
      <td>
        <span style="font-weight: 700; color: #047857;">📥 ${(p.download?.initialDownloads || 0).toLocaleString()}</span>
      </td>
      <td>
        <span style="color: #64748b; font-size: 0.85rem;">${escapeHtml(p.date || '-')}</span>
      </td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.editPost('${p.id}')">✏️ 編集</button>
          <a href="/post.html?id=${p.id}" target="_blank" class="btn btn-secondary btn-sm" title="実際の記事を表示">👁️</a>
          <button type="button" class="btn btn-danger btn-sm" onclick="window.deletePost('${p.id}')" title="削除">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function updateKpis(posts) {
  document.getElementById('kpi-post-count').textContent = `${posts.length} 件`;

  // 累計ダウンロード数合算
  let totalDl = 0;
  posts.forEach(p => {
    totalDl += (p.download?.initialDownloads || 0);
  });
  document.getElementById('kpi-total-dl').textContent = totalDl.toLocaleString();

  // GitHub APIからリアルタイムDL数を反映
  fetch('https://api.github.com/repos/moddencom/mod-portal/releases')
    .then(r => r.json())
    .then(releases => {
      let liveTotal = 0;
      releases.forEach(r => {
        (r.assets || []).forEach(a => liveTotal += (a.download_count || 0));
      });
      if (liveTotal > 0) {
        document.getElementById('kpi-total-dl').textContent = liveTotal.toLocaleString();
      }
    })
    .catch(() => {});
}

// 検索フィルター
document.getElementById('post-search')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.game.toLowerCase().includes(query) ||
    (p.category || '').toLowerCase().includes(query)
  );
  renderPostsTable(filtered);
});

// --- 記事エディタ処理 ---
function initPostEditor() {
  const form = document.getElementById('post-editor-form');
  const contentInput = document.getElementById('form-content');
  const titleInput = document.getElementById('form-title');
  const gameInput = document.getElementById('form-game');
  const idInput = document.getElementById('form-id');

  // ゲーム名入力時にID（スラッグ）を自動生成補助
  gameInput?.addEventListener('input', () => {
    if (!currentEditingPostId && !idInput.value) {
      const slug = gameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      idInput.value = slug;
    }
  });

  // タイトル入力時にサブバーのプレビューを更新
  titleInput?.addEventListener('input', () => {
    document.getElementById('editor-title-preview').textContent = titleInput.value || '無題の記事';
    updateLivePreview();
  });

  // 本文入力時にリアルタイムプレビュー更新
  contentInput?.addEventListener('input', updateLivePreview);

  // プレビュー表示切り替えボタン
  document.getElementById('btn-toggle-preview')?.addEventListener('click', () => {
    const layout = document.querySelector('.editor-layout');
    layout.classList.toggle('preview-hidden');
  });

  // 記事保存イベント
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const postData = {
      id: document.getElementById('form-id').value.trim(),
      title: document.getElementById('form-title').value.trim(),
      summary: document.getElementById('form-summary').value.trim(),
      category: document.getElementById('form-category').value.trim() || 'RPG / サバイバル',
      game: document.getElementById('form-game').value.trim(),
      version: document.getElementById('form-version').value.trim() || 'Ver 1.0',
      date: document.getElementById('form-date').value || new Date().toISOString().split('T')[0],
      featuredImage: document.getElementById('form-featured-image').value.trim() || '/images/dead-age-hero.png',
      author: 'JP Modding Team',
      download: {
        format: document.getElementById('form-dl-format').value.trim() || 'ZIPアーカイブ (.zip)',
        size: document.getElementById('form-dl-size').value.trim() || '約 10 MB',
        gameVersion: document.getElementById('form-dl-game-version').value.trim() || 'Steam 最新版対応',
        assetName: document.getElementById('form-dl-asset-name').value.trim() || '',
        initialDownloads: 0,
        mainUrl: document.getElementById('form-dl-main-url').value.trim() || '#',
        mirrorUrl: document.getElementById('form-dl-mirror-url').value.trim() || '',
        supportUrl: document.getElementById('form-dl-support-url').value.trim() || 'https://ofuse.me/o?uid=227788'
      },
      content: document.getElementById('form-content').value
    };

    try {
      const btn = document.getElementById('btn-save-post');
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ 保存中...</span>';

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      const result = await res.json();

      if (result.success) {
        alert('🎉 記事を正常に保存しました！\n（本番サイトに反映するには「本番サイトへ公開」ボタンを押してください）');
        await loadPostsData();
        await checkGitStatus();
        switchView('dashboard-view');
      } else {
        alert('保存エラー: ' + result.error);
      }
    } catch (err) {
      alert('通信エラー: ' + err.message);
    } finally {
      const btn = document.getElementById('btn-save-post');
      btn.disabled = false;
      btn.innerHTML = '<span>💾 記事を保存する</span>';
    }
  });

  // グローバル関数（行クリック・編集）
  window.editPost = (id) => {
    const post = allPosts.find(p => p.id === id);
    if (!post) return;

    currentEditingPostId = id;
    document.getElementById('editor-mode-badge').textContent = '編集中';
    document.getElementById('editor-mode-badge').className = 'badge badge-edit';
    document.getElementById('editor-title-preview').textContent = post.title;

    document.getElementById('form-id').value = post.id;
    document.getElementById('form-id').readOnly = true; // IDの変更は事故防止のためロック
    document.getElementById('form-game').value = post.game || '';
    document.getElementById('form-title').value = post.title || '';
    document.getElementById('form-summary').value = post.summary || '';
    document.getElementById('form-category').value = post.category || '';
    document.getElementById('form-version').value = post.version || '';
    document.getElementById('form-date').value = post.date || '';

    const dl = post.download || {};
    document.getElementById('form-dl-format').value = dl.format || '';
    document.getElementById('form-dl-size').value = dl.size || '';
    document.getElementById('form-dl-game-version').value = dl.gameVersion || '';
    document.getElementById('form-dl-main-url').value = dl.mainUrl || '';
    document.getElementById('form-dl-mirror-url').value = dl.mirrorUrl || '';
    document.getElementById('form-dl-asset-name').value = dl.assetName || '';
    document.getElementById('form-dl-support-url').value = dl.supportUrl || 'https://ofuse.me/o?uid=227788';

    document.getElementById('form-featured-image').value = post.featuredImage || '';
    document.getElementById('form-content').value = post.content || '';

    updateLivePreview();
    switchView('editor-view');
  };

  window.deletePost = async (id) => {
    const post = allPosts.find(p => p.id === id);
    if (!confirm(`本当に記事「${post?.title || id}」を削除しますか？\n※この操作は取り消せません。`)) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        alert('記事を削除しました。');
        await loadPostsData();
        await checkGitStatus();
      } else {
        alert('削除エラー: ' + result.error);
      }
    } catch (err) {
      alert('通信エラー: ' + err.message);
    }
  };
}

function openEditorForNew() {
  currentEditingPostId = null;
  document.getElementById('editor-mode-badge').textContent = '新規作成';
  document.getElementById('editor-mode-badge').className = 'badge badge-new';
  document.getElementById('editor-title-preview').textContent = '無題の記事';

  document.getElementById('post-editor-form').reset();
  document.getElementById('form-id').readOnly = false;
  document.getElementById('form-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('form-dl-support-url').value = 'https://ofuse.me/o?uid=227788';

  updateLivePreview();
  switchView('editor-view');
}

function updateLivePreview() {
  const preview = document.getElementById('live-preview-content');
  const title = document.getElementById('form-title').value;
  const content = document.getElementById('form-content').value;

  if (!preview) return;

  if (!content && !title) {
    preview.innerHTML = `<p style="color: #64748b;">左側のフォームに入力すると、ここに本番と同じ見た目でプレビューされます。</p>`;
    return;
  }

  preview.innerHTML = `
    <h1 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${escapeHtml(title || '無題の記事')}</h1>
    ${content}
  `;
}

// --- 画像アップロード処理 ---
function initImageUploads() {
  // アイキャッチ画像アップロード
  const featInput = document.getElementById('input-featured-file');
  featInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploaded = await uploadImageFile(file);
    if (uploaded) {
      document.getElementById('form-featured-image').value = uploaded.url;
      alert(`アイキャッチ画像をアップロードしました：\n${uploaded.url}`);
    }
  });

  // 本文用画像ドロップゾーン
  const dropzone = document.getElementById('article-dropzone');
  const articleFileInput = document.getElementById('input-article-file');

  if (dropzone && articleFileInput) {
    dropzone.addEventListener('click', () => articleFileInput.click());

    articleFileInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (file) handleArticleImageUpload(file);
    });

    ['dragover', 'dragenter'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file) handleArticleImageUpload(file);
    });
  }
}

async function handleArticleImageUpload(file) {
  const uploaded = await uploadImageFile(file);
  if (!uploaded) return;

  const listContainer = document.getElementById('uploaded-images-list');
  const tagsBox = document.getElementById('uploaded-tags-box');
  listContainer.style.display = 'block';

  const imgTag = `<img src="${uploaded.url}" alt="${file.name.replace(/\.[^.]+$/, '')}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />`;

  const pill = document.createElement('div');
  pill.className = 'uploaded-pill';
  pill.innerHTML = `🖼️ <code>${uploaded.filename}</code> (クリックで本文へ挿入)`;
  pill.addEventListener('click', () => {
    window.insertTag(`\n${imgTag}\n`, '');
    alert('本文に画像タグを挿入しました！');
  });

  tagsBox.appendChild(pill);
  // 初回自動挿入
  window.insertTag(`\n${imgTag}\n`, '');
}

async function uploadImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            dataBase64: e.target.result
          })
        });
        const result = await res.json();
        if (result.success) {
          resolve(result);
        } else {
          alert('アップロード失敗: ' + result.error);
          resolve(null);
        }
      } catch (err) {
        alert('通信エラー: ' + err.message);
        resolve(null);
      }
    };
    reader.readAsDataURL(file);
  });
}

// --- AI記事生成アシスタントモーダル ---
function initAiModal() {
  const modal = document.getElementById('ai-modal');
  const openBtn = document.getElementById('btn-open-ai-modal');
  const closeBtn = document.getElementById('btn-close-ai-modal');
  const cancelBtn = document.getElementById('btn-cancel-ai');
  const submitBtn = document.getElementById('btn-submit-ai');

  openBtn?.addEventListener('click', () => {
    // 既にエディタに入力されているゲーム名があれば引き継ぐ
    const currentGame = document.getElementById('form-game').value;
    if (currentGame) {
      document.getElementById('ai-game-name').value = currentGame;
    }
    modal.classList.add('show');
  });

  const closeModal = () => modal.classList.remove('show');
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  submitBtn?.addEventListener('click', async () => {
    const gameName = document.getElementById('ai-game-name').value.trim();
    const features = document.getElementById('ai-features').value.trim();
    const extra = document.getElementById('ai-extra').value.trim();

    if (!gameName) {
      alert('ゲーム名を入力してください。');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>🤖 AI思考中...（約5〜15秒）</span>';

    try {
      const res = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName,
          description: features,
          promptExtra: extra
        })
      });
      const data = await res.json();

      if (data.success && data.result) {
        const r = data.result;
        document.getElementById('form-game').value = gameName;
        if (!document.getElementById('form-id').value) {
          document.getElementById('form-id').value = gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        document.getElementById('form-title').value = r.title || '';
        document.getElementById('form-summary').value = r.summary || '';
        document.getElementById('form-category').value = r.category || 'RPG / サバイバル';
        document.getElementById('form-content').value = r.contentHtml || '';

        updateLivePreview();
        closeModal();
        alert('✨ AIが記事下書きを生成し、フォームに自動入力しました！\nプレビューを確認し、必要に応じて微調整してください。');
      } else {
        alert('AI生成エラー: ' + (data.error || 'レスポンスの取得に失敗しました'));
      }
    } catch (err) {
      alert('通信エラー: ' + err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>✨ AIで下書きを自動生成して入力欄へ適用</span>';
    }
  });
}

// --- 本番公開モーダル & Gitステータス ---
function initPublishModal() {
  const publishBtn = document.getElementById('btn-quick-publish');
  const modal = document.getElementById('publish-modal');
  const closeBtn = document.getElementById('btn-close-publish-modal');
  const doneBtn = document.getElementById('btn-done-publish');

  publishBtn?.addEventListener('click', async () => {
    if (!confirm('本番サイトへビルド＆Gitプッシュを行いますか？\n（数秒〜十数秒で本番サイトに反映されます）')) {
      return;
    }

    modal.classList.add('show');
    document.getElementById('publish-loading').style.display = 'block';
    document.getElementById('publish-result').style.display = 'none';
    document.getElementById('publish-modal-footer').style.display = 'none';

    try {
      const res = await fetch('/api/publish', { method: 'POST' });
      const data = await res.json();

      document.getElementById('publish-loading').style.display = 'none';
      document.getElementById('publish-result').style.display = 'block';
      document.getElementById('publish-modal-footer').style.display = 'flex';

      const icon = document.getElementById('publish-status-icon');
      const title = document.getElementById('publish-status-title');
      const logBox = document.getElementById('publish-log');

      if (data.success) {
        icon.textContent = '🎉';
        title.textContent = '本番サイトへの公開が完了しました！';
        title.style.color = '#059669';
      } else {
        icon.textContent = '⚠️';
        title.textContent = '一部の処理で警告・エラーが発生しました';
        title.style.color = '#dc2626';
      }
      logBox.textContent = data.output || 'ログなし';

      checkGitStatus();
    } catch (err) {
      document.getElementById('publish-loading').style.display = 'none';
      document.getElementById('publish-result').style.display = 'block';
      document.getElementById('publish-modal-footer').style.display = 'flex';
      document.getElementById('publish-status-icon').textContent = '❌';
      document.getElementById('publish-status-title').textContent = '通信エラーが発生しました';
      document.getElementById('publish-log').textContent = err.message;
    }
  });

  const closeModal = () => modal.classList.remove('show');
  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);
}

async function checkGitStatus() {
  try {
    const res = await fetch('/api/git-status');
    const data = await res.json();
    const dot = document.getElementById('git-status-dot');
    const text = document.getElementById('git-status-text');
    const kpiCommit = document.getElementById('kpi-last-commit');
    const kpiNote = document.getElementById('kpi-git-note');

    if (kpiCommit && data.lastCommit) {
      kpiCommit.textContent = data.lastCommit;
    }

    if (data.hasChanges) {
      dot.className = 'status-dot'; // warning yellow
      text.textContent = '未公開の変更あり';
      if (kpiNote) kpiNote.textContent = '⚠️ 本番公開待ちの変更があります';
    } else {
      dot.className = 'status-dot clean'; // green
      text.textContent = '本番と同期中（最新）';
      if (kpiNote) kpiNote.textContent = '✅ 最新状態が公開されています';
    }
  } catch (err) {
    console.warn('Gitステータス確認失敗:', err);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
