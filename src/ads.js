/**
 * 広告配信・ローテーション管理スクリプト
 * - 複数のA8広告を登録し、一定時間（例: 8秒）ごとにフェードで自動切り替え
 * - ページ内の該当枠（サイドバー、記事内、ダウンロード直前等）で最適表示
 */

export const adInventory = {
  // ゲーム・宅配買取（ふるいち）
  furuichi: {
    name: 'ふるいち宅配買取',
    category: ['all', 'game', 'buy'],
    banner300x250: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+AS6N76+5W1M+5YZ75" rel="nofollow" target="_blank">
        <img border="0" width="300" height="250" alt="ゲーム宅配買取なら【ふるいち】" src="https://www26.a8.net/svt/bgt?aid=261018912652&wid=001&eno=01&mid=s00000027481001003000&mc=1" style="border-radius: 6px;">
      </a>
      <img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=4BEJHC+AS6N76+5W1M+5YZ75" alt="" style="display:inline;">
    `,
    textLink: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+AS6N76+5W1M+5YJRM" rel="nofollow" target="_blank" class="ad-text-highlight">
        🎮 送料無料・自動集荷でラクラク現金化！遊ばなくなったゲーム機・ソフトの宅配買取なら【ふるいち】
      </a>
      <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4BEJHC+AS6N76+5W1M+5YJRM" alt="" style="display:inline;">
    `
  },

  // ゲーマー向け超軽量セキュリティ（WEBROOT）
  webroot: {
    name: 'WEBROOT アンチウイルス for Gamer',
    category: ['all', 'security', 'mod', 'fps'],
    banner300x250: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+B2WG36+5U2I+5ZEMP" rel="nofollow" target="_blank">
        <img border="0" width="300" height="250" alt="WEBROOT アンチウイルス for Gamer" src="https://www29.a8.net/svt/bgt?aid=261018912670&wid=001&eno=01&mid=s00000027225001005000&mc=1" style="border-radius: 6px;">
      </a>
      <img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4BEJHC+B2WG36+5U2I+5ZEMP" alt="" style="display:inline;">
    `,
    banner300x250_alt: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+B2WG36+5U2I+609HT" rel="nofollow" target="_blank">
        <img border="0" width="300" height="250" alt="ゲームの邪魔をしない超軽量セキュリティ" src="https://www24.a8.net/svt/bgt?aid=261018912670&wid=001&eno=01&mid=s00000027225001009000&mc=1" style="border-radius: 6px;">
      </a>
      <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4BEJHC+B2WG36+5U2I+609HT" alt="" style="display:inline;">
    `,
    textLink: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+B2WG36+5U2I+5YRHE" rel="nofollow" target="_blank" class="ad-text-highlight">
        🛡️ MOD導入時も安心！動作激軽・ラグなしのゲーマー専用セキュリティ【WEBROOT アンチウイルス for Gamer】
      </a>
      <img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4BEJHC+B2WG36+5U2I+5YRHE" alt="" style="display:inline;">
    `
  }
};

/**
 * 自動広告ローテーション機能の初期化
 */
export function initAdRotator() {
  const rotatingSlots = document.querySelectorAll('.ad-rotating-slot');
  if (!rotatingSlots.length) return;

  const ads300 = [
    adInventory.webroot.banner300x250,
    adInventory.furuichi.banner300x250,
    adInventory.webroot.banner300x250_alt
  ];

  rotatingSlots.forEach(slot => {
    let currentIndex = 0;
    
    // 初回表示
    slot.innerHTML = ads300[currentIndex];

    // 9秒ごとにクロスフェード切り替え
    setInterval(() => {
      slot.style.opacity = '0';
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % ads300.length;
        slot.innerHTML = ads300[currentIndex];
        slot.style.opacity = '1';
      }, 300);
    }, 9000);
  });
}
