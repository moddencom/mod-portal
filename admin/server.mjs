import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const POSTS_DATA_PATH = path.join(ROOT_DIR, 'src', 'posts', 'data.js');
const IMAGES_DIR = path.join(ROOT_DIR, 'images');
const PORT = 3333;

// サーバー起動時に自動でブラウザを開く
function openBrowser(url) {
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${start} ${url}`);
}

// posts データを安全に読み込む
async function loadPosts() {
  const dataJsContent = fs.readFileSync(POSTS_DATA_PATH, 'utf8');
  // 動的インポートでキャッシュを回避するためにタイムスタンプを付与
  const tempFile = path.join(__dirname, `temp_posts_${Date.now()}.mjs`);
  try {
    fs.writeFileSync(tempFile, dataJsContent, 'utf8');
    const mod = await import(`file://${tempFile}`);
    return mod.posts || [];
  } finally {
    if (fs.existsSync(tempFile)) {
      try { fs.unlinkSync(tempFile); } catch (e) {}
    }
  }
}

// posts データを src/posts/data.js に保存
function savePosts(posts) {
  const content = `/**
 * Mod記事データ一覧
 * 新しいMod記事を追加したい場合は、この配列にオブジェクトを1つ追加するだけで
 * トップページ・一覧・個別記事・サイドバーに自動反映されます。
 */
export const posts = ${JSON.stringify(posts, null, 2)};
`;
  fs.writeFileSync(POSTS_DATA_PATH, content, 'utf8');
}

// コマンド実行プロミス
function runCommand(cmd, cwd = ROOT_DIR) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd }, (err, stdout, stderr) => {
      if (err) {
        resolve({ success: false, output: (stdout || '') + (stderr || '') + err.message });
      } else {
        resolve({ success: true, output: (stdout || '') + (stderr || '') });
      }
    });
  });
}

// MIMEタイプの解決
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return types[ext] || 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // CORSヘッダー
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API エンドポイント ---

  // 1. 記事一覧取得: GET /api/posts
  if (req.method === 'GET' && pathname === '/api/posts') {
    try {
      const posts = await loadPosts();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, posts }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 2. 記事単体取得: GET /api/posts/:id
  if (req.method === 'GET' && pathname.startsWith('/api/posts/')) {
    const id = pathname.replace('/api/posts/', '').trim();
    try {
      const posts = await loadPosts();
      const post = posts.find(p => p.id === id);
      if (post) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, post }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: '記事が見つかりません' }));
      }
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 3. 記事の保存・更新: POST /api/posts
  if (req.method === 'POST' && pathname === '/api/posts') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const newPost = JSON.parse(body);
        if (!newPost.id || !newPost.title || !newPost.game) {
          throw new Error('ID、タイトル、ゲーム名は必須です');
        }

        const posts = await loadPosts();
        const existingIndex = posts.findIndex(p => p.id === newPost.id);
        if (existingIndex >= 0) {
          // 既存記事の更新
          posts[existingIndex] = { ...posts[existingIndex], ...newPost };
        } else {
          // 新規記事の先頭追加
          posts.unshift(newPost);
        }

        savePosts(posts);

        // build.mjs を即時実行して静的HTMLも更新
        await runCommand('node build.mjs');

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: '記事を正常に保存しました', post: newPost }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 4. 記事の削除: DELETE /api/posts/:id
  if (req.method === 'DELETE' && pathname.startsWith('/api/posts/')) {
    const id = pathname.replace('/api/posts/', '').trim();
    try {
      const posts = await loadPosts();
      const filtered = posts.filter(p => p.id !== id);
      if (filtered.length === posts.length) {
        throw new Error('削除対象の記事が見つかりません');
      }

      savePosts(filtered);
      await runCommand('node build.mjs');

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, message: '記事を削除しました' }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 5. 画像アップロード: POST /api/upload
  if (req.method === 'POST' && pathname === '/api/upload') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, dataBase64 } = JSON.parse(body);
        if (!filename || !dataBase64) {
          throw new Error('ファイル名と画像データが必要です');
        }

        // 拡張子のサニタイズ
        const ext = path.extname(filename).toLowerCase() || '.png';
        const safeBaseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_\-]/g, '_');
        const finalFilename = `${safeBaseName}_${Date.now()}${ext}`;
        const targetPath = path.join(IMAGES_DIR, finalFilename);

        const buffer = Buffer.from(dataBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        fs.writeFileSync(targetPath, buffer);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          url: `/images/${finalFilename}`,
          filename: finalFilename
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // 6. Gitステータス確認: GET /api/git-status
  if (req.method === 'GET' && pathname === '/api/git-status') {
    const statusRes = await runCommand('git status --porcelain');
    const logRes = await runCommand('git log -1 --oneline');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      success: true,
      hasChanges: statusRes.output.trim().length > 0,
      details: statusRes.output,
      lastCommit: logRes.output.trim()
    }));
    return;
  }

  // 7. ワンクリック本番公開: POST /api/publish
  if (req.method === 'POST' && pathname === '/api/publish') {
    try {
      // 1. ビルド実行
      const buildRes = await runCommand('node build.mjs');
      // 2. Git Add
      await runCommand('git add -A');
      // 3. Git Commit
      const timestamp = new Date().toLocaleString('ja-JP');
      const commitRes = await runCommand(`git commit -m "Update via Admin Studio (${timestamp})"`);
      // 4. Git Push
      const pushRes = await runCommand('git push origin main');

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        success: pushRes.success,
        output: `【ビルド】\n${buildRes.output}\n\n【コミット】\n${commitRes.output}\n\n【プッシュ】\n${pushRes.output}`
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 8. ローカルLLM (RX 6600 / Ollama連携) 記事自動生成: POST /api/ai-generate
  if (req.method === 'POST' && pathname === '/api/ai-generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { gameName, modTitle, description, promptExtra } = JSON.parse(body);

        const prompt = `あなたはプロのゲーム翻訳家およびPCゲームMOD専門ライターです。
以下の情報を元に、PCゲーム日本語化MODポータルサイト用の魅力的な記事コンテンツを日本語で作成してください。

【対象ゲーム名】: ${gameName}
【MODタイトル】: ${modTitle || '完全日本語化MOD'}
【MODの特徴・変更点】: ${description || 'ストーリー・UI・アイテムの完全日本語化、高品質フォントへの置換'}
${promptExtra ? `【追加要望】: ${promptExtra}` : ''}

以下のJSON形式のみを出力してください（Markdownコードブロックは不要、純粋なJSONのみ）：
{
  "title": "【ゲーム名】魅力的な記事タイトル（Steam対応などを含む）",
  "summary": "150文字前後の概要文。ゲームの魅力とMODの完成度を洋画吹き替え風に魅力的に紹介。",
  "category": "ジャンル（例: RPG / サバイバル、FPS / コメディ 等）",
  "features": [
    "特徴1（ストーリー・字幕の自然な翻訳）",
    "特徴2（高品質フォント採用による視認性向上）",
    "特徴3（ワンタッチ導入）"
  ],
  "contentHtml": "<h2>『ゲーム名』日本語化MODについて</h2><p>ゲームの紹介とMODの概要...</p><blockquote><strong>💡 本MODの特徴:</strong><br>・特徴...</blockquote><h2>日本語化MODのスクリーンショット</h2><p>スクリーンショットの説明...</p><h2>導入手順・インストール方法</h2><ol><li>手順1...</li><li>手順2...</li></ol>"
}`;

        // まずローカルOllama (http://localhost:11434) への接続を試みる
        let aiResult = null;
        try {
          const ollamaReq = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3.1:latest', // または gemma2:9b, qwen2.5:7b などインストール済みのモデル
              prompt: prompt,
              stream: false,
              format: 'json'
            }),
            signal: AbortSignal.timeout(60000)
          });

          if (ollamaReq.ok) {
            const data = await ollamaReq.json();
            aiResult = JSON.parse(data.response);
          }
        } catch (ollamaErr) {
          // Ollamaが未起動またはエラーの場合、高品質なテンプレートフォールバックを自動生成
          console.log('Ollama is not running locally, using smart template fallback.');
        }

        if (!aiResult) {
          // スマートテンプレートフォールバック（Ollama未起動時でも即座に高品質な下書きが生成される）
          aiResult = {
            title: `【${gameName}】${modTitle || '完全日本語化MOD 配布・導入手順ガイド（Steam対応）'}`,
            summary: `人気作『${gameName}』の有志による完全日本語化MODです。ストーリー・セリフ・UI・アイテム説明に至るまで自然な日本語へ徹底ローカライズ。さらに視認性の高い高品質日本語フォントへの置換を実施しています。`,
            category: "RPG / サバイバル",
            features: [
              `『${gameName}』の全編ストーリー・クエスト・UIを映画吹き替え風の自然な日本語にローカライズ`,
              "モリサワ製 高品質ユニバーサルデザインフォント「BIZ UDPゴシック」に完全置換",
              "ゲームフォルダにファイルを配置するだけのワンタッチ簡単導入"
            ],
            contentHtml: `<h2>『${gameName}』日本語化MODについて</h2>
<p>『${gameName}』は奥深いゲーム性を誇る名作ですが、公式では日本語に非対応（または機械翻訳）となっていました。</p>
<p>本MODでは、プレイヤーが物語の世界へ完全に没入できるよう、<strong>ストーリー・字幕・セリフ・アイテム解説を自然な日本語に徹底ローカライズ</strong>。さらに文字潰れや見切れを防ぐ高品質フォントへの置換を行っています。</p>

<blockquote>
  <strong>💡 本MODの主な特徴:</strong><br>
  ・<strong>自然な翻訳:</strong> 洋画さながらの自然な台詞回しとゲーム用語の統一監修<br>
  ・<strong>美麗フォント採用:</strong> 読みやすく美しいユニバーサルデザインフォントへ置換<br>
  ・<strong>簡単ワンタッチ導入:</strong> ゲームフォルダにドラッグ＆ドロップするだけで即座にプレイ可能
</blockquote>

<h2>日本語化MODのスクリーンショット</h2>
<p>実際にMODを適用したゲーム画面です。会話シーンやメニュー画面が美しく読みやすい日本語で表示されます。</p>

<h2>導入手順・インストール方法</h2>
<ol>
  <li>本ページ下部のダウンロードボタンよりMODアーカイブ（ZIP）をダウンロードします。</li>
  <li>ダウンロードしたZIPファイルを右クリックし「すべて展開」で解凍します。</li>
  <li>ゲームのインストールフォルダを開き、解凍したファイルを上書き配置してください。</li>
  <li>ゲームを起動し、正常に日本語で表示されることを確認します。</li>
</ol>`
          };
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, result: aiResult }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // --- 静的ファイル配信 ---
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '/admin' || reqPath === '/admin/') {
    reqPath = '/admin/index.html';
  }

  let filePath = path.join(ROOT_DIR, reqPath);

  // ディレクトリ指定の場合は index.html を探す
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      filePath = indexPath;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/admin/`;
  console.log(`====================================================`);
  console.log(`🛠️  JP MOD PORTAL 管理スタジオが起動しました！`);
  console.log(`👉  URL: ${url}`);
  console.log(`====================================================`);
  console.log(`※ Ctrl + C でサーバーを停止できます。`);
  
  // 起動時にブラウザを自動オープン
  openBrowser(url);
});
