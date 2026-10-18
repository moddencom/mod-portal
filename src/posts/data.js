/**
 * Mod記事データ一覧
 * 新しいMod記事を追加したい場合は、この配列にオブジェクトを1つ追加するだけで
 * トップページ・一覧・個別記事・サイドバーに自動反映されます。
 */
export const posts = [
  {
    id: "dead-age",
    title: "【Dead Age】完全日本語化MOD 配布・導入手順ガイド（Steam対応）",
    summary: "ターン制ゾンビサバイバルRPG『Dead Age』の有志による完全日本語化MODです。全編にわたる会話・ストーリーの映画吹き替え風ローカライズ、敵名・スキル・装備名の自然な日本語化、さらに高品質日本語フォント（BIZ UDPゴシック）への完全置換を実施。",
    category: "RPG / サバイバル",
    game: "Dead Age",
    version: "Ver 1.0 (2026.10.18)",
    date: "2026-10-18",
    featuredImage: "/images/dead-age-hero.png",
    author: "JP Modding Team",
    download: {
      format: "ZIPアーカイブ (.zip)",
      size: "約 93.3 MB",
      gameVersion: "Steam 最新版対応",
      mainUrl: "https://github.com/moddencom/mod-portal/releases/download/v1.1.0/DeadAge_JP_Mod_v1.0.zip",
      mirrorUrl: "https://link-hub.net/10208061/wGrFvCowm5eP",
      supportUrl: "https://ofuse.me/o?uid=227788"
    },
    content: `
      <h2>『Dead Age』完全日本語化MODについて</h2>
      <p>『Dead Age』は、文明崩壊後の世界を生き抜くターン制コマンドバトルRPGです。キャンプ運営、仲間との人間関係、パーマデス、そしてマルチエンディングなど奥深いゲーム性を誇りますが、公式日本語は非対応（または機械翻訳）となっていました。</p>
      <p>本MODでは、プレイヤーが没入できるよう<strong>全編のストーリー・セリフ・独白を洋画吹き替え風の自然な日本語に徹底ローカライズ</strong>。さらに機械翻訳特有の不自然な敵名（「レイジング・ベイグラント」「アンデッドラボアシスタント」等）や装備品・スキルの名称、UIレイアウトに至るまで完全に洗練しています。</p>

      <blockquote>
        <strong>💡 本MODの特徴:</strong><br>
        ・<strong>完全自然なストーリー翻訳:</strong> 主人公ジャックのタフな独白、シェリフやトリッシュ、ハンクらの個性豊かな掛け合いを映画さながらの台詞回しに全面刷新<br>
        ・<strong>モリサワ製 高品質ユニバーサルデザインフォント採用:</strong> 商用・再配布フリーの「BIZ UDPゴシック Bold」をUnityアセットに直接組み込み、見やすく美しいタイポグラフィを実現<br>
        ・<strong>戦闘・敵名・装備の完全監修:</strong> 「耐久力」「会心率」「レジスト」「ニット帽」などゲーム用語として直感的な表記に統一<br>
        ・<strong>ワンタッチ導入:</strong> ゲームフォルダにドラッグ＆ドロップするだけで即座にプレイ可能
      </blockquote>

      <h2>日本語化MODのスクリーンショット</h2>
      <p>サバイバル手帳のUI、探索イベント、キャラクターの会話ログなどが以下のように美しく表示されます。</p>
      <img src="/images/dead-age-preview-gameplay.png" alt="Dead Age 日本語化ゲーム画面" />

      <h2>MODの導入手順（ステップ解説）</h2>
      <p>導入は非常にシンプルです。ダウンロードしたZIPファイルを解凍し、ゲームフォルダに上書きするだけで完了します。</p>

      <div class="step-box">
        <span class="step-num">STEP 1</span>
        <h3>MODファイルのダウンロード</h3>
        <p>下記ダウンロードエリアより、最新のMODファイル（<code>DeadAge_JP_Mod_v1.0.zip</code>）をダウンロードします。</p>
      </div>

      <div class="step-box">
        <span class="step-num">STEP 2</span>
        <h3>ゲームのインストール先フォルダを開く</h3>
        <p>Steamライブラリから『Dead Age』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>
        <p>ゲームの実行ファイル（<code>DeadAge.exe</code>）や <code>DeadAge_Data</code> フォルダが存在するフォルダが開きます。</p>
      </div>

      <div class="step-box">
        <span class="step-num">STEP 3</span>
        <h3>ファイルを上書き配置してゲーム起動</h3>
        <p>ダウンロードしたZIPを解凍し、中にある <code>DeadAge_Data</code> フォルダを『Dead Age』のインストールフォルダにドラッグ＆ドロップして上書きしてください。</p>
        <p>ゲームを起動し、言語設定（画面右上の国旗アイコン）で「中文（中国国旗）」を選択すると、日本語化が完全に反映されます。</p>
      </div>

      <h2>アンインストール方法（元の状態に戻す）</h2>
      <p>Steamライブラリで『Dead Age』を右クリック ＞「プロパティ」＞「インストール済みファイル」＞「ゲームファイルの整合性を確認」をクリックしてください。自動的に元の初期状態へ復元されます。</p>

      <h2>免責事項・注意事項</h2>
      <ul>
        <li>本MODは有志による非公式パッチです。開発元（Silent Dreams）および販売元（Headup Games）とは一切関係ありません。</li>
        <li>MODの導入は自己責任にてお願いいたします。</li>
      </ul>
    `
  },
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
      mainUrl: "https://github.com/moddencom/mod-portal/releases/download/v1.0.0/Oregon-WindowsNoEditor_JP.pak", // GitHub Releasesの1クリック直DLリンク
      mirrorUrl: "https://link-hub.net/10208061/wGrFvCowm5eP", // 収益化アップローダー（Linkvertise + WorkUpload）のリンク
      supportUrl: "https://ofuse.me/o?uid=227788" // OFUSE 投げ銭・支援リンク
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
