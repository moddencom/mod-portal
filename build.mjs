/**
 * 新しいMod記事を `src/posts/data.js` に追加したあと、
 * `node build.mjs` を実行すると、全HTMLページに最新記事リストとデフォルト詳細を直接埋め込みます。
 */
import fs from 'fs';
import { posts } from './src/posts/data.js';

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
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<span class="section-count" id="article-count">.*?<\/span>/s, `<span class="section-count" id="article-count">${countText}</span>`);
  html = html.replace(/<!-- ARTICLES_START -->[\s\S]*?<!-- ARTICLES_END -->/, `<!-- ARTICLES_START -->\n${cardsHTML}\n          <!-- ARTICLES_END -->`);
  fs.writeFileSync(file, html, 'utf8');
}

// post.html の初期状態にも先頭記事をプリレンダリング（SEO＆即時表示対応）
const firstPost = posts[0];
if (firstPost) {
  let postHtml = fs.readFileSync('post.html', 'utf8');
  postHtml = postHtml.replace(/<span id="breadcrumb-title">.*?<\/span>/, `<span id="breadcrumb-title">${firstPost.title}</span>`);
  postHtml = postHtml.replace(/<span class="category-badge" id="post-category">.*?<\/span>/, `<span class="category-badge" id="post-category">${firstPost.category}</span>`);
  postHtml = postHtml.replace(/<span class="post-date" id="post-date">.*?<\/span>/, `<span class="post-date" id="post-date">${firstPost.date}</span>`);
  postHtml = postHtml.replace(/<span class="post-version" id="post-version">.*?<\/span>/, `<span class="post-version" id="post-version">${firstPost.version}</span>`);
  postHtml = postHtml.replace(/<h1 class="post-title" id="post-title">.*?<\/h1>/, `<h1 class="post-title" id="post-title">${firstPost.title}</h1>`);
  postHtml = postHtml.replace(/<p class="post-lead" id="post-summary">.*?<\/p>/, `<p class="post-lead" id="post-summary">${firstPost.summary}</p>`);
  postHtml = postHtml.replace(/<img id="post-featured-image" src=".*?" alt=".*?"/, `<img id="post-featured-image" src="${firstPost.featuredImage}" alt="${firstPost.title}"`);
  postHtml = postHtml.replace(/<!-- POST_BODY_START -->[\s\S]*?<!-- POST_BODY_END -->/, `<!-- POST_BODY_START -->\n${firstPost.content}\n        <!-- POST_BODY_END -->`);
  postHtml = postHtml.replace(/<h3 class="download-title" id="dl-title">.*?<\/h3>/, `<h3 class="download-title" id="dl-title">『${firstPost.game}』${firstPost.version}</h3>`);
  postHtml = postHtml.replace(/<span class="dl-val" id="dl-format">.*?<\/span>/, `<span class="dl-val" id="dl-format">${firstPost.download.format}</span>`);
  postHtml = postHtml.replace(/<span class="dl-val" id="dl-size">.*?<\/span>/, `<span class="dl-val" id="dl-size">${firstPost.download.size}</span>`);
  postHtml = postHtml.replace(/<span class="dl-val" id="dl-game-version">.*?<\/span>/, `<span class="dl-val" id="dl-game-version">${firstPost.download.gameVersion}</span>`);
  postHtml = postHtml.replace(/<a href=".*?" id="dl-button-main"/, `<a href="${firstPost.download.mainUrl}" id="dl-button-main"`);
  postHtml = postHtml.replace(/<a href=".*?" id="dl-button-mirror"/, `<a href="${firstPost.download.mirrorUrl}" id="dl-button-mirror"`);
  postHtml = postHtml.replace(/<a href=".*?" id="dl-button-support"/, `<a href="${firstPost.download.supportUrl}" id="dl-button-support"`);
  fs.writeFileSync('post.html', postHtml, 'utf8');
}

console.log('Successfully pre-rendered HTML into index.html, mods.html, and post.html!');
