import { posts } from './posts/data.js';

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('articles-list');
  const countElement = document.getElementById('article-count');

  if (countElement) {
    countElement.textContent = `掲載数: ${posts.length}件`;
  }

  if (listContainer) {
    listContainer.innerHTML = posts.map(post => `
      <article class="card-item">
        <a href="./post.html?id=${post.id}" class="card-image-wrapper">
          <img src="${post.featuredImage}" alt="${post.title}" class="card-image" loading="lazy" onerror="this.src='./images/default-thumbnail.png'" />
          <span class="card-badge">${post.category}</span>
        </a>
        <div class="card-content">
          <div class="card-meta">
            <time datetime="${post.date}">${post.date}</time>
            <span>•</span>
            <span>${post.version}</span>
          </div>
          <h3 class="card-title">
            <a href="./post.html?id=${post.id}">${post.title}</a>
          </h3>
          <p class="card-excerpt">${post.summary}</p>
          <div class="card-footer">
            <span class="card-game">${post.game}</span>
            <a href="./post.html?id=${post.id}" class="card-link-text">
              詳細・導入ガイド &rarr;
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }
});
