/**
 * Mod記事データ一覧
 * 新しいMod記事を追加したい場合は、この配列にオブジェクトを1つ追加するだけで
 * トップページ・一覧・個別記事・サイドバーに自動反映されます。
 */
export const posts = [
  {
    id: "high-on-life",
    title: "【High on Life】日本語化MOD 配布・導入手順ガイド（Steam / Game Pass対応）",
    summary: "Rick and Mortyのクリエイターが手掛ける異色コメディFPS『High on Life』の有志日本語化MODです。全字幕・手紙・UIの完全ローカライズ、フォント置換により快適にプレイ可能です。",
    category: "FPS / コメディ",
    game: "High on Life",
    version: "Ver 1.0 (2026.10.18)",
    date: "2026-10-18",
    featuredImage: "/images/high-on-life-hero.png",
    author: "JP Modding Team",
    download: {
      format: "PAKファイル (.pak)",
      size: "約 443 MB",
      gameVersion: "Steam / Xbox Game Pass 最新版",
      mainUrl: "https://github.com/moddencom/mod-portal/releases", // GitHub Releasesの高速DLリンク
      mirrorUrl: "#mirror-link", // 収益化アップローダー（KatFile / WorkUpload等）のリンク
      supportUrl: "#support-link" // 投げ銭・支援（OFUSE / BOOTH / Buy Me a Coffee等）のリンク
    },
    content: `
      <h2>『High on Life』日本語化MODについて</h2>
      <p>『High on Life』は、軽快なトークと下品で強烈なギャグが魅力のSFアクションFPSですが、公式では日本語に対応していません。本MODを導入することで、ゲーム内の字幕、銃（ガトリアン）たちの掛け合い、アイテム説明、イベントレターなどがすべて自然な日本語で表示されるようになります。</p>

      <blockquote>
        <strong>💡 本MODの特徴:</strong><br>
        ・ゲーム内全49箇所のフォントを読みやすい高品質日本語フォントに完全置換<br>
        ・英語に巻き戻ってしまう不具合（ハッシュ値不一致）を完全修正済み<br>
        ・字幕の文字見切れ・はみ出しを防ぐ最適化改行処理を適用
      </blockquote>

      <h2>日本語化MODのスクリーンショット</h2>
      <p>ゲーム内の会話字幕やメニュー画面、各種UIが以下のように日本語で違和感なく表示されます。</p>
      <img src="/images/hol-preview-gameplay.png" alt="High on Life 日本語化ゲーム画面" />

      <h2>MODの導入手順（ステップ解説）</h2>
      <p>導入は非常に簡単です。ダウンロードしたPAKファイルを指定のフォルダに配置するだけで完了します。</p>

      <div class="step-box">
        <span class="step-num">STEP 1</span>
        <h3>MODファイルのダウンロード</h3>
        <p>下記ダウンロードエリアより、最新のMODファイル（<code>Oregon-WindowsNoEditor_JP.pak</code>）をダウンロードします。</p>
      </div>

      <div class="step-box">
        <span class="step-num">STEP 2</span>
        <h3>ゲームのインストール先フォルダを開く</h3>
        <p>Steamライブラリから『High on Life』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>
        <p>以下のフォルダを開いてください：<br>
        <code>Oregon\\Content\\Paks\\~mods\\</code><br>
        ※<code>~mods</code> フォルダが存在しない場合は、新規作成してください。</p>
      </div>

      <div class="step-box">
        <span class="step-num">STEP 3</span>
        <h3>ファイルを配置してゲーム起動</h3>
        <p>ダウンロードしたPAKファイルを <code>~mods</code> フォルダ内にそのままコピー＆ペーストします。ゲームを起動すると自動的に日本語化が適用されます。</p>
      </div>

      <h2>アンインストール方法</h2>
      <p><code>~mods</code> フォルダに配置した <code>Oregon-WindowsNoEditor_JP.pak</code> を削除するだけで、安全に元の英語版に戻すことができます。</p>

      <h2>免責事項・注意事項</h2>
      <ul>
        <li>本MODは有志による非公式パッチです。開発元・販売元とは一切関係ありません。</li>
        <li>MODの導入は自己責任にてお願いいたします。</li>
        <li>ゲーム本体の将来的な大型アップデートにより、一時的に動作しなくなる場合があります。その際は本ポータルサイトにて修正パッチを配布いたします。</li>
      </ul>
    `
  }
];
