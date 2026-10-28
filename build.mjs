/**
 * 新しいMod記事を `src/posts/data.js` に追加したあと、
 * `node build.mjs` を実行すると、全HTMLページに最新記事リストとデフォルト詳細を直接埋め込みます。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { posts } from './src/posts/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createCardsHTML(items) {
  return items.map(post => `
          <article class="card-item">
            <a href="/post.html?id=${post.id}" class="card-image-wrapper">
              <img src="${post.featuredImage}" alt="${post.title}" class="card-image" loading="lazy" />
              <span class="card-badge">${post.category}</span>
            </a>
            <div class="card-content">
              <div class="card-meta">
                <time datetime="${post.date}">${post.date}</time>
                <span>•</span>
                <span>${post.version}</span>
                <span>•</span>
                <span class="dl-count-badge" data-asset="${post.download.assetName || ''}">📥 <span class="card-dl-num">${(post.download.initialDownloads || 0).toLocaleString()}</span> DL</span>
              </div>
              <h3 class="card-title">
                <a href="/post.html?id=${post.id}">${post.title}</a>
              </h3>
              <p class="card-excerpt">${post.summary}</p>
              <div class="card-footer">
                <span class="card-game">${post.game}</span>
                <a href="/post.html?id=${post.id}" class="card-link-text">
                  詳細・導入ガイド &rarr;
                </a>
              </div>
            </div>
          </article>`).join('\n');
}

const cardsHTML = createCardsHTML(posts);
const countText = `掲載数: ${posts.length}件`;

for (const file of ['index.html', 'mods.html']) {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<span class="section-count" id="article-count">.*?<\/span>/s, `<span class="section-count" id="article-count">${countText}</span>`);
  html = html.replace(/<!-- ARTICLES_START -->[\s\S]*?<!-- ARTICLES_END -->/, `<!-- ARTICLES_START -->\n${cardsHTML}\n          <!-- ARTICLES_END -->`);
  fs.writeFileSync(filePath, html, 'utf8');
}

// post.html の初期状態にも先頭記事をプリレンダリング（SEO＆即時表示対応）
const firstPost = posts[0];
if (firstPost) {
  const postHtmlPath = path.join(__dirname, 'post.html');
  let postHtml = fs.readFileSync(postHtmlPath, 'utf8');
  postHtml = postHtml.replace(/<title>.*?<\/title>/, `<title>${firstPost.title} | Modden</title>`);
  postHtml = postHtml.replace(/<span id="breadcrumb-title">.*?<\/span>/, `<span id="breadcrumb-title">${firstPost.title}</span>`);
  postHtml = postHtml.replace(/<h1 class="post-title" id="post-title">.*?<\/h1>/, `<h1 class="post-title" id="post-title">${firstPost.title}</h1>`);
  postHtml = postHtml.replace(/<p class="post-lead" id="post-summary">.*?<\/p>/, `<p class="post-lead" id="post-summary">${firstPost.summary}</p>`);
  postHtml = postHtml.replace(/<div class="post-content" id="post-body">[\s\S]*?<\/div>\s*<!-- \/post-body -->|<!-- POST_BODY_START -->[\s\S]*?<\/div>/, `<!-- POST_BODY_START -->\n${firstPost.content}\n      </div>`);
  fs.writeFileSync(postHtmlPath, postHtml, 'utf8');
}

console.log(`Successfully built all portal pages! Total posts: ${posts.length}`);
