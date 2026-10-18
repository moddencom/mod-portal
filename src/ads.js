/**
 * 広告配信・ローテーション管理スクリプト
 * - 複数のA8広告を登録し、一定時間ごとにフェードで自動切り替え
 * - トップヘッダーバナー、サイドバー、ダウンロード直前枠などに対応
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
  },

  // アニメ・ゲームグッズ・限定アイテム（FaNeMa）
  fanema: {
    name: 'オリジナルキャラクターグッズの通販サイト FaNeMa',
    category: ['all', 'goods', 'anime', 'game'],
    banner300x250: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+BET46Q+5FAA+5YZ75" rel="nofollow" target="_blank">
        <img border="0" width="300" height="250" alt="オリジナルキャラクターグッズ通販 FaNeMa" src="https://www27.a8.net/svt/bgt?aid=261018912690&wid=001&eno=01&mid=s00000025309001003000&mc=1" style="border-radius: 6px;">
      </a>
      <img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4BEJHC+BET46Q+5FAA+5YZ75" alt="" style="display:inline;">
    `,
    banner728x90: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+BET46Q+5FAA+5ZU29" rel="nofollow" target="_blank">
        <img border="0" width="728" height="90" alt="限定アイテムや特典付きアイテムなど！通販サイト FaNeMa" src="https://www27.a8.net/svt/bgt?aid=261018912690&wid=001&eno=01&mid=s00000025309001007000&mc=1" style="border-radius: 6px; max-width: 100%; height: auto;">
      </a>
      <img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4BEJHC+BET46Q+5FAA+5ZU29" alt="" style="display:inline;">
    `,
    banner468x60: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+BET46Q+5FAA+60H7L" rel="nofollow" target="_blank">
        <img border="0" width="468" height="60" alt="FaNeMa" src="https://www22.a8.net/svt/bgt?aid=261018912690&wid=001&eno=01&mid=s00000025309001010000&mc=1" style="border-radius: 6px; max-width: 100%; height: auto;">
      </a>
      <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4BEJHC+BET46Q+5FAA+60H7L" alt="" style="display:inline;">
    `,
    textLink: `
      <a href="https://px.a8.net/svt/ejp?a8mat=4BEJHC+BET46Q+5FAA+5YRHE" rel="nofollow" target="_blank" class="ad-text-highlight">
        🎁 限定・特典付きアイテム多数！オリジナルキャラクター＆ゲームグッズ通販【FaNeMa】
      </a>
      <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4BEJHC+BET46Q+5FAA+5YRHE" alt="" style="display:inline;">
    `
  }
};

/**
 * 自動広告ローテーション機能の初期化
 */
export function initAdRotator() {
  // 300x250 バナースロット（サイドバー、ダウンロード前）
  const rotating300Slots = document.querySelectorAll('.ad-rotating-slot');
  if (rotating300Slots.length) {
    const ads300 = [
      adInventory.fanema.banner300x250,
      adInventory.webroot.banner300x250,
      adInventory.furuichi.banner300x250,
      adInventory.webroot.banner300x250_alt
    ];

    rotating300Slots.forEach((slot, slotIdx) => {
      let currentIndex = slotIdx % ads300.length;
      slot.innerHTML = ads300[currentIndex];

      setInterval(() => {
        slot.style.opacity = '0';
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % ads300.length;
          slot.innerHTML = ads300[currentIndex];
          slot.style.opacity = '1';
        }, 300);
      }, 8000);
    });
  }

  // トップ ヘッダー下 バナー（728x90 / テキスト等の自動ローテーション）
  const topAdSlots = document.querySelectorAll('.ad-top-rotating-slot');
  if (topAdSlots.length) {
    const topAds = [
      adInventory.fanema.banner728x90,
      adInventory.webroot.textLink,
      adInventory.furuichi.textLink
    ];

    topAdSlots.forEach(slot => {
      let currentIndex = 0;
      slot.innerHTML = topAds[currentIndex];

      setInterval(() => {
        slot.style.opacity = '0';
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % topAds.length;
          slot.innerHTML = topAds[currentIndex];
          slot.style.opacity = '1';
        }, 300);
      }, 10000);
    });
  }
}
