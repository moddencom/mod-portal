import { posts } from './posts/data.js';
import { initAdRotator } from './ads.js';

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.getElementById('articles-list');
  const countElement = document.getElementById('article-count');
  const searchInput = document.getElementById('mod-search-input');

  function renderPosts(filteredPosts) {
    if (countElement) {
      countElement.textContent = `掲載数: ${filteredPosts.length}件`;
    }

    if (listContainer) {
      if (filteredPosts.length === 0) {
        listContainer.innerHTML = `<p style="color: #64748b; padding: 20px 0;">該当する日本語化MOD記事が見つかりませんでした。</p>`;
        return;
      }

      listContainer.innerHTML = filteredPosts.map(post => `
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
        </article>
      `).join('');
    }
  }

  // 初回表示
  renderPosts(posts);

  // 検索フィルター機能（一覧ページ用）
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.trim().toLowerCase();
      if (!keyword) {
        renderPosts(posts);
        return;
      }
      const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(keyword) ||
        p.game.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword) ||
        p.summary.toLowerCase().includes(keyword)
      );
      renderPosts(filtered);
    });
  }

  // 広告自動ローテーション開始
  initAdRotator();
});
