import { posts } from './posts/data.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id') || posts[0].id;

  const post = posts.find(p => p.id === postId) || posts[0];

  // タイトル・メタ
  document.title = `${post.title} | JP MOD PORTAL`;
  document.getElementById('breadcrumb-title').textContent = post.title;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-summary').textContent = post.summary;
  document.getElementById('post-category').textContent = post.category;
  document.getElementById('post-date').textContent = post.date;
  document.getElementById('post-version').textContent = post.version;

  // アイキャッチ画像
  const imgElement = document.getElementById('post-featured-image');
  if (imgElement) {
    imgElement.src = post.featuredImage;
    imgElement.alt = post.title;
  }

  // 記事本文
  const bodyElement = document.getElementById('post-body');
  if (bodyElement) {
    bodyElement.innerHTML = post.content;
  }

  // ダウンロード情報
  document.getElementById('dl-title').textContent = `『${post.game}』${post.version}`;
  document.getElementById('dl-format').textContent = post.download.format;
  document.getElementById('dl-size').textContent = post.download.size;
  document.getElementById('dl-game-version').textContent = post.download.gameVersion;
  
  const dlButton = document.getElementById('dl-button-link');
  if (dlButton) {
    dlButton.href = post.download.url;
  }

  // 目次（TOC）の自動生成
  generateTOC(bodyElement);

  // サイドバーのおすすめ記事一覧
  const relatedList = document.getElementById('sidebar-related-posts');
  if (relatedList) {
    relatedList.innerHTML = posts.map(p => `
      <li>
        <span class="widget-date">${p.date}</span>
        <a href="/post.html?id=${p.id}">${p.title}</a>
      </li>
    `).join('');
  }
});

function generateTOC(contentElement) {
  const tocList = document.getElementById('toc-list');
  const headings = contentElement.querySelectorAll('h2');
  
  if (!headings.length || !tocList) {
    document.getElementById('toc-box')?.remove();
    return;
  }

  headings.forEach((heading, idx) => {
    const headingId = `heading-${idx}`;
    heading.id = headingId;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${headingId}`;
    a.textContent = heading.textContent;
    li.appendChild(a);
    tocList.appendChild(li);
  });
}
