import { posts } from './posts/data.js';
import { initAdRotator } from './ads.js';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1561708315057197066/NZB16CB9d4muf7HrjD_XSMXt_Dhz9-zpJjIk0QFh80mV6oWq_ovhjBoM-K1KK-oGqf-x';
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB (Discord Webhook上限)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('report-form');
  const modSelect = document.getElementById('report-mod');
  const fromNotice = document.getElementById('from-article-notice');
  const successBox = document.getElementById('report-success');
  const submitBtn = document.getElementById('report-submit-btn');
  const errorMsg = document.getElementById('report-error-msg');

  // 画像アップロード用エレメント
  const fileInput = document.getElementById('report-file-input');
  const dropzone = document.getElementById('dropzone');
  const previewWrapper = document.getElementById('preview-wrapper');
  const previewImg = document.getElementById('image-preview');
  const removeBtn = document.getElementById('btn-remove-preview');
  const toggleUrlBtn = document.getElementById('toggle-url-input');
  const urlInputContainer = document.getElementById('url-input-container');

  let attachedFile = null;

  // URLパラメータからMod IDやゲーム名を取得
  const urlParams = new URLSearchParams(window.location.search);
  const paramModId = urlParams.get('id') || urlParams.get('mod') || urlParams.get('game');

  // 動的にセレクトボックスのオプションを生成
  if (modSelect) {
    modSelect.innerHTML = '<option value="">-- 対象のMOD / ゲームを選択してください --</option>';
    posts.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `『${p.game}』- ${p.title.replace(/【.*?】/, '').trim()}`;
      modSelect.appendChild(opt);
    });

    const otherOpt = document.createElement('option');
    otherOpt.value = 'other';
    otherOpt.textContent = 'その他・ポータルサイト全般へのご意見';
    modSelect.appendChild(otherOpt);

    // URLパラメータで一致するものがあれば自動選択
    if (paramModId) {
      const matched = posts.find(p => p.id === paramModId || p.game.toLowerCase().includes(paramModId.toLowerCase()));
      if (matched) {
        modSelect.value = matched.id;
        if (fromNotice) {
          fromNotice.style.display = 'block';
          fromNotice.innerHTML = `💡 記事<strong>「${matched.title}」</strong>から自動セットされました。`;
        }
      }
    }
  }

  // --- 画像ファイル処理関数 ---
  function handleImageFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('画像ファイル（PNG, JPG, GIF, WebP）を選択してください。');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`ファイルサイズが大きすぎます（${(file.size / 1024 / 1024).toFixed(1)}MB）。8MB以下の画像を選択してください。`);
      return;
    }

    attachedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewImg && previewWrapper) {
        previewImg.src = e.target.result;
        previewWrapper.style.display = 'inline-block';
        if (dropzone) {
          dropzone.style.display = 'none';
        }
      }
    };
    reader.readAsDataURL(file);
  }

  function clearImageFile() {
    attachedFile = null;
    if (fileInput) fileInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewWrapper) previewWrapper.style.display = 'none';
    if (dropzone) dropzone.style.display = 'block';
  }

  // ドロップゾーンクリックでファイルダイアログ
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
      }
    });

    // ドラッグ＆ドロップイベント
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('drag-over');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('drag-over');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFile(e.dataTransfer.files[0]);
      }
    });
  }

  // クリップボードからの直接貼り付け（Ctrl + V）
  window.addEventListener('paste', (e) => {
    // フォームにフォーカスがある時や画面全体で画像ペーストを検知
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          break;
        }
      }
    }
  });

  // プレビュー削除ボタン
  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearImageFile();
    });
  }

  // 画像URL切り替えアコーディオン
  if (toggleUrlBtn && urlInputContainer) {
    toggleUrlBtn.addEventListener('click', () => {
      const isHidden = urlInputContainer.style.display === 'none';
      urlInputContainer.style.display = isHidden ? 'block' : 'none';
      toggleUrlBtn.textContent = isHidden ? '▲ 画像URL入力を閉じる' : '🔗 画像URLで指定する場合はこちら';
    });
  }

  // --- フォーム送信イベント ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (errorMsg) errorMsg.style.display = 'none';

      const selectedModId = modSelect.value;
      if (!selectedModId) {
        alert('対象のMODを選択してください。');
        modSelect.focus();
        return;
      }

      const postObj = posts.find(p => p.id === selectedModId);
      const modName = postObj ? `『${postObj.game}』${postObj.title}` : 'その他・サイト全般';
      const reportType = document.querySelector('input[name="report_type"]:checked')?.value || '誤字・誤訳・未翻訳';
      const nickname = document.getElementById('report-name').value.trim() || '名無しサバイバー';
      const content = document.getElementById('report-content').value.trim();
      const imageUrlInput = document.getElementById('report-image')?.value.trim() || '';

      if (!content) {
        alert('報告内容を入力してください。');
        return;
      }

      // 送信中UI
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="btn-spinner" viewBox="0 0 50 50" style="width: 20px; height: 20px; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
        </svg>
        <span>Discordへ送信中...</span>
      `;

      // Discord Embed メッセージの組み立て
      const payload = {
        username: "MODポータル報告Bot",
        embeds: [
          {
            title: `📢 【${reportType}】新しい報告が届きました`,
            color: reportType.includes('クラッシュ') ? 0xef4444 : (reportType.includes('誤訳') ? 0x3b82f6 : 0x10b981),
            fields: [
              {
                name: "対象タイトル / MOD",
                value: modName,
                inline: false
              },
              {
                name: "報告種別",
                value: reportType,
                inline: true
              },
              {
                name: "報告者",
                value: nickname,
                inline: true
              },
              {
                name: "報告内容・状況",
                value: content.length > 1000 ? content.slice(0, 1000) + '...(省略)' : content,
                inline: false
              }
            ],
            footer: {
              text: `JP MOD PORTAL 報告システム • ${new Date().toLocaleString('ja-JP')}`
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      // 送信元リファラ
      if (document.referrer) {
        payload.embeds[0].fields.push({
          name: "送信元URL",
          value: document.referrer,
          inline: false
        });
      }

      try {
        let response;

        if (attachedFile) {
          // 画像ファイルが添付されている場合：multipart/form-data で直接添付
          const fileName = attachedFile.name || 'screenshot.png';
          payload.embeds[0].image = { url: `attachment://${fileName}` };
          payload.embeds[0].fields.push({
            name: "添付画像",
            value: `📎 ${fileName} (${(attachedFile.size / 1024).toFixed(1)} KB)`,
            inline: false
          });

          const formData = new FormData();
          formData.append('payload_json', JSON.stringify(payload));
          formData.append('files[0]', attachedFile, fileName);

          response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: formData
          });
        } else {
          // 画像URLのみ、または画像なしの場合
          if (imageUrlInput && /^https?:\/\/.+/i.test(imageUrlInput)) {
            payload.embeds[0].image = { url: imageUrlInput };
            payload.embeds[0].fields.push({
              name: "画像URL",
              value: imageUrlInput,
              inline: false
            });
          }

          response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        }

        if (!response.ok) {
          throw new Error(`Discord APIエラー: ${response.status}`);
        }

        // 成功
        form.style.display = 'none';
        if (successBox) successBox.style.display = 'block';
      } catch (err) {
        console.error('Webhook送信エラー:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🚀 報告を送信する (Discordへ通知)</span>';
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.textContent = `送信中にエラーが発生しました（${err.message}）。お手数ですが少し時間をおいて再度お試しください。`;
        }
      }
    });
  }

  // 広告自動ローテーション開始
  initAdRotator();
});
