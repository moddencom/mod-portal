import { posts } from './posts/data.js';
import { initAdRotator } from './ads.js';
import { getDownloadCounts } from './stats.js';

document.addEventListener('DOMContentLoaded', async () => {
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
  
  const dlMain = document.getElementById('dl-button-main');
  if (dlMain) dlMain.href = post.download.mainUrl || post.download.url || '#';

  const dlMirror = document.getElementById('dl-button-mirror');
  if (dlMirror) dlMirror.href = post.download.mirrorUrl || '#';

  const dlSupport = document.getElementById('dl-button-support');
  if (dlSupport) dlSupport.href = post.download.supportUrl || '#';

  // 記事内 不具合・誤訳報告ボタンのリンク（対象MODのIDを自動付与）
  const dlReport = document.getElementById('dl-report-link');
  if (dlReport) {
    dlReport.href = `/report.html?id=${post.id}`;
  }

  // ダウンロード数の初期表示 & リアルタイム取得
  const dlCountNum = document.getElementById('dl-count-num');
  if (dlCountNum) {
    dlCountNum.textContent = (post.download.initialDownloads || 0).toLocaleString();
    getDownloadCounts().then(counts => {
      if (post.download.assetName && counts[post.download.assetName] !== undefined) {
        dlCountNum.textContent = counts[post.download.assetName].toLocaleString();
      }
    });
  }

  // 「使うね！（お借りします）」感謝・広告応援ボタン
  const thanksBtn = document.getElementById('btn-use-mod');
  if (thanksBtn) {
    thanksBtn.addEventListener('click', () => {
      // 感謝を伝えるための広告リンク一覧からランダムオープン
      const thanksAds = [
        'https://px.a8.net/svt/ejp?a8mat=4BEJHC+B2WG36+5U2I+5YRHE', // WEBROOT アンチウイルス
        'https://px.a8.net/svt/ejp?a8mat=4BEJHC+AS6N76+5W1M+5YJRM', // ふるいち 宅配買取
        'https://px.a8.net/svt/ejp?a8mat=4BEJHC+BET46Q+5FAA+5ZU29'  // FaNeMa キャラグッズ
      ];
      const targetAd = thanksAds[Math.floor(Math.random() * thanksAds.length)];
      window.open(targetAd, '_blank', 'noopener,noreferrer');

      showThanksToast('💖 「使うね！」ありがとうございます！製作者の大きな励みになります！');
    });
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

  // 広告自動ローテーション開始
  initAdRotator();
});

function generateTOC(contentElement) {
  const tocList = document.getElementById('toc-list');
  if (!contentElement || !tocList) return;
  const headings = contentElement.querySelectorAll('h2');
  
  if (!headings.length) {
    document.getElementById('toc-box')?.remove();
    return;
  }

  tocList.innerHTML = '';
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

function showThanksToast(msg) {
  const existing = document.querySelector('.thanks-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'thanks-toast';
  toast.innerHTML = `
    <span style="font-size: 1.3rem;">🙏</span>
    <span>${msg}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
