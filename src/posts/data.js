/**
 * Mod記事データ一覧
 * 新しいMod記事を追加したい場合は、この配列にオブジェクトを1つ追加するだけで
 * トップページ・一覧・個別記事・サイドバーに自動反映されます。
 */
export const posts = [
  {
  "id": "home-unique-horror-japanese",
  "title": "【Home】完全日本語化MOD 配布・導入ガイド（Epic Games / Steam対応・美麗レトロドットフォント同梱）",
  "summary": "プレイヤーの選択と行動で結末と真相が変化する名作サイコロジカル・ピクセルホラーADV『Home』の完全日本語化MODです。ストーリー会話・選択肢プロンプト・アイテム調査・手紙・全UI・エンディングまで全編（2,446スロット）を自然な日本語で完全網羅。作品の雰囲気に調和するレトロピクセルフォント「DotGothic16」を同梱しています。",
  "category": "日本語化",
  "game": "Home - A Unique Horror Adventure",
  "version": "Ver 1.0.0 (2026.10.28)",
  "date": "2026-10-28",
  "featuredImage": "/images/home_header.png",
  "author": "JP Modding Team",
  "download": {
    "format": "ワンクリックパッチャー内包 ZIPアーカイブ (.zip)",
    "size": "約 8.8 MB",
    "gameVersion": "Epic Games Store / Steam 最新版対応 (GameMaker 2.3+)",
    "assetName": "Home_Japanese_Mod_v1.0.0.zip",
    "initialDownloads": 0,
    "mainUrl": "https://mod-portal.pages.dev/downloads/Home_Japanese_Mod_v1.0.0.zip",
    "mirrorUrl": "https://workupload.com/file/j6FXLPg7nu4",
    "supportUrl": "https://ofuse.me/o?uid=227788"
  },
  "content": "\n      <h2>『Home - A Unique Horror Adventure』完全日本語化MODについて</h2>\n      <p>見知らぬ暗闇の部屋で目覚めた主人公が、自らの足取りと記憶を辿りながら我が家（Home）を目指すサイコロジカル・ピクセルホラーADV<strong>『Home - A Unique Horror Adventure』</strong>。</p>\n      <p>プレイヤーが「何を調べ、何を無視したか」「アイテムを拾ったか否か」によって物語の解釈と結末がダイナミックに分岐する名作ですが、これまで完全な日本語環境でプレイすることはできませんでした。</p>\n      <p>本MODは、ゲーム内の全ストーリー台詞、選択肢プロンプト、アイテム調査文、手紙、メニューUI、エンディング要約に至るまで<strong>全編（全2,446スロット）を洗練された自然な日本語で完全網羅</strong>したModです。</p>\n\n      <blockquote>\n        <strong>💡 本MODの主な特徴:</strong><br>\n        ・<strong>全編完全日本語化:</strong> 本編会話、選択肢プロンプト（「はい / いいえ」含む）、手紙、UIまで100%日本語対応<br>\n        ・<strong>世界観に調和するピクセルフォント同梱:</strong> 16px基準の美しいドット日本語フォント「DotGothic16」（SIL Open Font License 1.1）を採用<br>\n        ・<strong>自動改行・レイアウト最適化:</strong> ダイアログボックスの枠内に美しく収まるインテリジェント折り返し処理を実装<br>\n        ・<strong>ワンクリック簡単導入:</strong> 付属のパッチャーを実行するだけで自動検出・安全パッチ適用（バックアップ機能付き）\n      </blockquote>\n\n      <div style=\"background: rgba(220, 53, 69, 0.1); border-left: 4px solid #dc3545; padding: 16px; margin: 24px 0; border-radius: 4px;\">\n        <strong style=\"color: #dc3545; font-size: 1.05rem;\">⚠️ 【重要】ポストモーテム モードに関する注意書き</strong><br>\n        <p style=\"margin: 8px 0 0 0; line-height: 1.6;\">\n          ゲーム内の「ポストモーテム モード（開発者コメンタリー機能 / 吹き出し「！」）」は、<strong>ゲーム自体の元々の仕様上、字幕表示機能がそもそも実装されておらず音声（英語）のみが再生される仕様</strong>となっています。<br>\n          そのため、本MODでもコメンタリー字幕の表示は対象外（非対応）となります。<br>\n          開発者の英語音声が流れてホラーの雰囲気を壊してしまうのを防ぐため、<strong>初回プレイ時はポーズ画面の設定（OPTIONS）から【ポストモーテム モード：オフ (OFF)】にしておくことを強く推奨します</strong>。<br>\n          ※本モードはクリア後のおまけ機能であり、オフにしても本編のストーリー、謎解き、エンディング分岐には一切影響しません。\n        </p>\n      </div>\n\n      <h2>MODの導入手順（ステップ解説）</h2>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 1</span>\n        <h3>MODファイルのダウンロードと解凍</h3>\n        <p>本ページ下部のダウンロードエリアより、MODファイル（<code>Home_Japanese_Mod_v1.0.0.zip</code>）をダウンロードして解凍します。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 2</span>\n        <h3>日本語化パッチャーの実行</h3>\n        <p>解凍したフォルダ内にある「<strong><code>日本語化パッチ適用.bat</code></strong>」（または <code>Home_JP_Patcher.exe</code>）をダブルクリックで実行します。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 3</span>\n        <h3>ワンクリック適用の実行</h3>\n        <p>パッチャーがゲームのインストール先（Epic Games版 / Steam版）を自動検出します。<br>\n        画面の案内に従い、「<strong><code>1</code></strong>」を入力して <kbd>Enter</kbd> を押すと、自動的に元の <code>data.win.bak</code>（バックアップ）が作成され、高速に日本語化パッチが適用されます。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 4</span>\n        <h3>ゲームの起動</h3>\n        <p>ランチャー（Epic Games / Steam）から通常どおりゲームを起動します。美麗なドット絵日本語フォントでゲームが楽しめます！</p>\n      </div>\n\n      <h2>アンインストール方法（元の英語に戻す場合）</h2>\n      <p>パッチャーを再度起動し、「<strong><code>2: オリジナルの英語状態に戻す</code></strong>」を選択して Enter を押すだけで、自動作成されたバックアップから即座に元の状態へ復元されます。</p>\n\n      <h2>ゲーム内スクリーンショット</h2>\n      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;\">\n        <a href=\"/images/home_header.png\" target=\"_blank\">\n          <img src=\"/images/home_header.png\" alt=\"序盤のストーリーダイアログ\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n        <a href=\"/images/home_ss_postmortem.png\" target=\"_blank\">\n          <img src=\"/images/home_ss_postmortem.png\" alt=\"懐中電灯での探索風景\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n      </div>\n  "
},

  {
  "id": "12-is-better-than-6-japanese",
  "title": "【12 is Better Than 6】完全日本語化MOD 配布・導入ガイド（Steam版対応・19世紀活版印刷風フォント同梱）",
  "summary": "1830年代の西部開拓時代を舞台にした見下ろし型ハードボイルド・ステルスアクション『12 is Better Than 6』の完全日本語化MODです。全編（UI・全会話・字幕・操作説明）を西部劇映画調の渋い日本語で完全網羅。手描きスケッチの世界観にマッチする「しっぽり明朝 B1」（商用利用可能）を同梱しています。",
  "category": "日本語化",
  "game": "12 is Better Than 6",
  "version": "Ver 1.0 (2026.10.24)",
  "date": "2026-10-24",
  "featuredImage": "/images/12ibt6_header.png",
  "author": "JP Modding Team",
  "download": {
    "format": "ZIPアーカイブ (.zip)",
    "size": "約 14.6 MB",
    "gameVersion": "Steam 最新版対応 (High/Low両対応)",
    "assetName": "12_is_Better_Than_6_Japanese_MOD_v1.0.zip",
    "initialDownloads": 0,
    "mainUrl": "https://mod-portal.pages.dev/downloads/12_is_Better_Than_6_Japanese_MOD_v1.0.zip",
    "mirrorUrl": "https://workupload.com/file/2Rh9qmjGLYK",
    "supportUrl": "https://ofuse.me/o?uid=227788"
  },
  "content": "\n      <h2>『12 is Better Than 6』完全日本語化MODについて</h2>\n      <p>1830年代の血と硝煙が漂う北米・メキシコ国境の荒野を舞台にした、手描きスケッチ風見下ろし型ハードボイルド・ステルスアクション<strong>『12 is Better Than 6』</strong>（トゥエルブ・イズ・ベター・ザン・シックス）。</p>\n      <p>リボルバーの撃鉄（コック）を一手ずつ起こして射撃する本格的なガンアクションと、一撃必殺の緊張感が魅力の本作ですが、公式では日本語が未サポートとなっていました。</p>\n      <p>本MODは、ゲーム内の全UI、全幕にわたるストーリー会話、字幕、操作チュートリアル、Perk説明に至るまで<strong>全編を映画の吹き替え調（乾いた無法者たちの男言葉）で完全日本語化</strong>したMODです。</p>\n\n      <blockquote>\n        <strong>💡 本MODの主な特徴:</strong><br>\n        ・<strong>全編100%日本語化:</strong> メインストーリー、サブ会話、全Perk、武器、設定画面まで完全網羅<br>\n        ・<strong>世界観に合わせた19世紀活版印刷風フォント同梱:</strong> 文字端にインクだまりを持つ「しっぽり明朝 B1」（SIL Open Font License）を採用<br>\n        ・<strong>簡単導入・安全設計:</strong> ゲームフォルダへファイルを2つ上書きするだけで即座に反映<br>\n        ・<strong>代替フォント同梱:</strong> お好みに合わせて「Zen オールド明朝」や硬筆調の「クレー One」への切り替えも可能\n      </blockquote>\n\n      <h2>MODの導入手順（ステップ解説）</h2>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 1</span>\n        <h3>MODファイルのダウンロード</h3>\n        <p>本ページ下部のダウンロードエリアより、MODファイル（<code>12_is_Better_Than_6_Japanese_MOD_v1.0.zip</code>）をダウンロードして解凍します。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 2</span>\n        <h3>ゲームのインストール先フォルダを開く</h3>\n        <p>Steamライブラリから『12 is Better Than 6』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>\n        <p>フォルダ内の「<code>12ibt6Hi</code>」（通常版）または「<code>12ibt6Low</code>」（軽量版）を開きます。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 3</span>\n        <h3>ファイルをコピーして上書き</h3>\n        <p>解凍したMODフォルダ内にある以下の2つのファイルを「<code>12ibt6Hi</code>」（またはLow）フォルダへ上書きコピーします：</p>\n        <ul>\n          <li><code>localization.csv</code></li>\n          <li><code>NotoSerifCJKsc-Regular.otf</code></li>\n        </ul>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 4</span>\n        <h3>ゲーム内設定で「Japan」を選択</h3>\n        <p>ゲームを起動し、メインメニューの「<code>Settings</code> (設定)」＞「<code>Language</code> (言語)」から「<code>Japan</code>」を選択します。直ちに全てのテキストが美しい日本語に切り替わります！</p>\n      </div>\n\n      \n\n      <h2>ゲーム内スクリーンショット</h2>\n      <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;\">\n        <a href=\"/images/12ibt6_ss_settings_japan.png\" target=\"_blank\">\n          <img src=\"/images/12ibt6_ss_settings_japan.png\" alt=\"言語設定でJapanを選択\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n        <a href=\"/images/12ibt6_ss_dialogue_juan.png\" target=\"_blank\">\n          <img src=\"/images/12ibt6_ss_dialogue_juan.png\" alt=\"鉱山でのフアンとの会話\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n        <a href=\"/images/12ibt6_ss_dialogue_overseer1.png\" target=\"_blank\">\n          <img src=\"/images/12ibt6_ss_dialogue_overseer1.png\" alt=\"監視人の罵倒\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n        <a href=\"/images/12ibt6_ss_dialogue_overseer2.png\" target=\"_blank\">\n          <img src=\"/images/12ibt6_ss_dialogue_overseer2.png\" alt=\"過酷な強制労働イベント\" style=\"width:100%; border-radius:6px; border:1px solid #ddd;\" loading=\"lazy\" />\n        </a>\n      </div>\n\n      <h2>フォントの変更について（カスタマイズ）</h2>\n      <p>MODパッケージ内の「<code>alternative_fonts</code>」フォルダには、以下の代替フォントが同梱されています：</p>\n      <ul>\n        <li><strong>Zen オールド明朝 (ZenOldMincho):</strong> 小さなUI文字でも抜群の視認性を誇る伝統的明朝体</li>\n        <li><strong>クレー One (Klee One):</strong> 本作のボールペン手描きスケッチアートと調和する硬筆ペン字調</li>\n      </ul>\n      <p>フォントを変更したい場合は、お好みのフォントファイルを「<code>NotoSerifCJKsc-Regular.otf</code>」にリネームしてゲームフォルダへ上書きしてください。</p>\n\n      <h2>アンインストール方法</h2>\n      <p>Steamのライブラリから『12 is Better Than 6』を右クリック ＞「プロパティ」＞「インストール済みファイル」＞「ゲームファイルの整合性を確認」を実行することで、いつでも初期の英語版へ復元できます。</p>\n    "
},
  {
    "id": "pony-island-japanese",
    "title": "【Pony Island】完全日本語化MOD 配布・導入手順ガイド（Steam版対応・全編美麗ビットマップフォント表示）",
    "summary": "悪魔のアーケードゲームに挑むメタフィクションサスペンス傑作『Pony Island』の完全日本語化MODです。未公開のまま眠っていた公式日本語データ約9割を完全補完し、プログラム修正により内包ビットマップフォント描画を有効化。悪魔ルシファーの皮肉、壊れたレトロOS、パズル、ストーリー全編を美麗なドット絵日本語で楽しめます。",
    "category": "日本語化",
    "game": "Pony Island",
    "version": "Ver 1.0 (2026.10.20)",
    "date": "2026-10-20",
    "featuredImage": "/images/__________2026-10-20_231839_1792506068083.png",
    "author": "JP Modding Team",
    "download": {
      "format": "ZIPアーカイブ (.zip)",
      "size": "約 394 KB",
      "gameVersion": "Steam 最新版対応",
      "assetName": "Pony_Island_Japanese_MOD_v1.0.zip",
      "initialDownloads": 0,
      "mainUrl": "https://mod-portal.pages.dev/downloads/Pony_Island_Japanese_MOD_v1.0.zip",
      "mirrorUrl": "https://workupload.com/file/2Rh9qmjGLYK",
      "supportUrl": "https://ofuse.me/o?uid=227788"
    },
    "content": "\n      <h2>『Pony Island』完全日本語化MODについて</h2>\n      <p>『Inscryption』の作者 Daniel Mullins 氏の原点にして、Steamで圧倒的好評を誇るメタフィクション・パズルサスペンス<strong>『Pony Island』</strong>。</p>\n      <p>実は本作のゲームデータ内には、<strong>開発時に作成された非常に高クオリティな公式日本語訳（全体の約9割）が未公開のまま眠っていました</strong>。しかし、フォント差し替えプログラムの不具合と言語切り替えボタンの未配置により、公式には日本語でプレイすることができない状態となっていました。</p>\n      <p>本MODは、残された未翻訳部分（クレジットや一部システム用語など）をゲームの世界観に合わせて完全補完した上で、<strong>プログラム修正によりゲーム内に最初から内包されている美しいドット絵ビットマップフォントへの自動スワップを有効化</strong>した完全日本語化MODです。</p>\n\n      <blockquote>\n        <strong>💡 本MODの主な特徴:</strong><br>\n        ・<strong>全編完全日本語化:</strong> ストーリー、悪魔ルシファーとの対話、壊れたOS、パズル指示、UIまで100%日本語化<br>\n        ・<strong>世界観にマッチしたレトロドット絵フォント:</strong> ゲーム内内包の公式ビットマップフォント（BoutiqueBitmap）で雰囲気抜群<br>\n        ・<strong>アセット非破壊の安全設計:</strong> ゲームの元データ（.assets）を一切改変せず、外部CSVから高速クリーンロード<br>\n        ・<strong>簡単導入:</strong> 解凍したフォルダをゲームディレクトリに上書きするだけで自動で日本語が適用\n      </blockquote>\n\n     \n      <h2>MODの導入方法（インストール手順）</h2>\n      <ol style=\"line-height: 1.8; margin-left: 20px;\">\n        <li>下記の<strong>「無料ダウンロード」</strong>ボタンから <code>Pony_Island_Japanese_MOD_v1.0.zip</code> をダウンロードします。</li>\n        <li>Steamライブラリで『Pony Island』を右クリック ＞「管理」＞<strong>「ローカルファイルを閲覧」</strong>をクリックして、ゲームのインストール先フォルダを開きます。</li>\n        <li>ダウンロードしたZIPファイルを解凍し、中にある <code>PonyIsland_Data</code> フォルダを、ゲームのインストール先フォルダへそのまま<strong>上書きコピー（ドラッグ＆ドロップ）</strong>します。<br>※「ファイルを置き換える」を選択してください。</li>\n        <li>Steamから通常どおりゲームを起動します。自動的に日本語でゲームが始まります！</li>\n      </ol>\n\n      <div style=\"background: rgba(255, 193, 7, 0.1); border-left: 4px solid #ffc107; padding: 16px; margin: 20px 0; border-radius: 4px;\">\n        <strong>⚠️ 英語のまま起動する場合の対処法:</strong><br>\n        Windowsの過去のセーブ設定で言語が固定されている場合があります。同梱の <code>日本語設定を有効化.reg</code> をダブルクリックしてレジストリに登録すると、確実に日本語（ID: 11）が初期言語として有効化されます。\n      </div>\n\n      <h2>アンインストール方法（元に戻す場合）</h2>\n      <p>Steamライブラリで『Pony Island』を右クリック ＞「プロパティ」＞「インストール済みファイル」＞<strong>「ゲームファイルの整合性を確認」</strong>を実行してください。元の状態に完全に戻ります。</p>\n    \n<img src=\"/images/__________2026-10-20_232349_1792506253044.png\" alt=\"スクリーンショット 2026-10-20 232349\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);\" />\n"
  },
  {
    "id": "dead-age-brightness",
    "title": "【Dead Age】夜間・戦闘 明るさ＆視認性調整MOD 配布・導入手順ガイド（Steam版・F10設定GUI対応）",
    "summary": "ターン制ゾンビRPG『Dead Age』で夜間探索や雷雨の戦闘が暗すぎて敵が見えない問題を解消する視認性向上MODです。2D UI（文字・HPバー）の白飛びを起こさず、3D背景・キャラクターのみを美しく自然に照らし出します。ゲーム内リアルタイム調整・ホットキー（F5/F7/F8/F10）対応。",
    "category": "ユーティリティ / 改善",
    "game": "Dead Age",
    "version": "Ver 1.0 (2026.10.18)",
    "date": "2026-10-18",
    "featuredImage": "/images/dead-age-brightness-hero.jpg",
    "author": "JP Modding Team",
    "download": {
      "format": "ZIPアーカイブ (.zip)",
      "size": "約 646 KB",
      "gameVersion": "Steam 最新版対応",
      "assetName": "DeadAge_Brightness_Mod_v1.0.zip",
      "initialDownloads": 0,
      "mainUrl": "https://github.com/moddencom/mod-portal/releases/download/v1.2.0/DeadAge_Brightness_Mod_v1.0.zip",
      "mirrorUrl": "https://workupload.com/file/xtVV9pnxhS9",
      "supportUrl": "https://ofuse.me/o?uid=227788"
    },
    "content": "\n      <h2>『Dead Age』夜間・戦闘 明るさ＆視認性調整MODについて</h2>\n      <p>『Dead Age』をプレイしていて、<strong>「夜の探索や雨・雷の戦闘シーンが暗すぎて、敵やキャラクターがどこにいるのか全然見えない…！」</strong>と困ったことはありませんか？</p>\n      <p>本作にはゲーム内設定にガンマや輝度の調整項目が存在せず、モニタ自体の明るさを上げると今度はUI文字やHPバーが白飛びして読めなくなってしまうという課題がありました。</p>\n      <p>本MODは、Unityエンジン内部の<strong>環境光（Ambient Light）およびカメラ連動の補助照明（Camera Fill Light）</strong>を高度に制御することで、<strong>UIのコントラストを保ったまま、暗闇に沈んでいた敵や味方、3D背景だけをクッキリ美しく照らし出す</strong>専用ユーティリティMODです。</p>\n\n      <blockquote>\n        <strong>💡 本MODの主な特徴:</strong><br>\n        ・<strong>UI文字が白飛びしない:</strong> 2D UIレイヤーを除外し、3Dオブジェクト・背景のみを自然にライティング<br>\n        ・<strong>ゲーム内リアルタイム調整:</strong> プレイ中にホットキー（F5/F7/F8）で即時調光、F10でGUIスライダー画面を開閉<br>\n        ・<strong>選べる4段階プリセット:</strong> 「標準」「夜間おすすめ」「クリアナイト」「最大(昼間級)」をワンクリック適用<br>\n        ・<strong>設定の自動保存:</strong> スライダーで調整した設定は次回起動時にもそのまま保持<br>\n        ・<strong>完全共存:</strong> 当サイトで配布中の「Dead Age 完全日本語化MOD」とも100%安全に併用可能\n      </blockquote>\n\n      <h2>ゲーム内スクリーンショット</h2>\n      <p>実際に本MODを適用したゲーム画面です。暗闇だったハイウェイの戦闘シーンでも、敵ゾンビの姿や味方キャラクターが鮮明に浮かび上がり、快適にコマンド選択を行えます。</p>\n\n      <div style=\"display: flex; flex-direction: column; gap: 24px; margin: 24px 0;\">\n        <div>\n          <h4 style=\"margin-bottom: 8px; color: var(--text-heading, #fff);\">▼ 夜間ハイウェイ戦闘（視認性向上・UI白飛びなし）</h4>\n          <img src=\"/images/dead-age-brightness-preview.jpg\" alt=\"Dead Age 明るさ調整MOD 適用後戦闘画面\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);\" />\n        </div>\n\n        <div>\n          <h4 style=\"margin-bottom: 8px; color: var(--text-heading, #fff);\">▼ ゲーム内設定画面 [F10キー]（マウス操作・スライダー・プリセット）</h4>\n          <img src=\"/images/dead-age-brightness-gui.jpg\" alt=\"Dead Age 明るさ調整MOD 設定メニュー\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);\" />\n        </div>\n      </div>\n\n      <h2>操作方法・ショートカットキー</h2>\n      <p>ゲームプレイ中、いつでもキーボードから瞬時に明るさを切り替えることができます：</p>\n\n      <div style=\"overflow-x: auto; margin: 16px 0;\">\n        <table style=\"width: 100%; border-collapse: collapse; text-align: left; background: rgba(255, 255, 255, 0.03); border-radius: 8px; overflow: hidden;\">\n          <thead>\n            <tr style=\"background: rgba(255, 255, 255, 0.08); border-bottom: 1px solid rgba(255, 255, 255, 0.1);\">\n              <th style=\"padding: 12px 16px; width: 25%;\">キー</th>\n              <th style=\"padding: 12px 16px; width: 35%;\">機能</th>\n              <th style=\"padding: 12px 16px;\">説明</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr style=\"border-bottom: 1px solid rgba(255, 255, 255, 0.05);\">\n              <td style=\"padding: 10px 16px;\"><code>[F5]</code></td>\n              <td style=\"padding: 10px 16px;\"><strong>ブースト ON / OFF</strong></td>\n              <td style=\"padding: 10px 16px;\">明るさブーストの有効／無効（バニラ標準）を即座に切り替えます</td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid rgba(255, 255, 255, 0.05);\">\n              <td style=\"padding: 10px 16px;\"><code>[F8]</code> / <code>[+]</code></td>\n              <td style=\"padding: 10px 16px;\"><strong>明るさアップ</strong></td>\n              <td style=\"padding: 10px 16px;\">明るさを +0.2x ずつ段階的に明るくします（最大 4.0x）</td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid rgba(255, 255, 255, 0.05);\">\n              <td style=\"padding: 10px 16px;\"><code>[F7]</code> / <code>[-]</code></td>\n              <td style=\"padding: 10px 16px;\"><strong>明るさダウン</strong></td>\n              <td style=\"padding: 10px 16px;\">明るさを -0.2x ずつ段階的に暗くします（最小 0.5x）</td>\n            </tr>\n            <tr style=\"border-bottom: 1px solid rgba(255, 255, 255, 0.05);\">\n              <td style=\"padding: 10px 16px;\"><code>[F6]</code></td>\n              <td style=\"padding: 10px 16px;\"><strong>標準リセット</strong></td>\n              <td style=\"padding: 10px 16px;\">初期値（バニラ標準の1.0x）に一括リセットします</td>\n            </tr>\n            <tr>\n              <td style=\"padding: 10px 16px;\"><code>[F10]</code></td>\n              <td style=\"padding: 10px 16px;\"><strong>設定メニュー開閉</strong></td>\n              <td style=\"padding: 10px 16px;\">マウス操作できる詳細設定ウィンドウ（GUI）を表示／非表示にします</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <p>※キー操作時には、画面上部に現在の明るさ倍率（例: <code>★ 明るさブースト: ON (1.8x)</code>）が一時的にポップアップ表示されます。</p>\n\n      <h2>MODの導入手順（ステップ解説）</h2>\n      <p>導入は非常にシンプルです。ファイルをゲームのインストールフォルダに配置するだけで完了します。</p>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 1</span>\n        <h3>MODファイルのダウンロード</h3>\n        <p>下記ダウンロードエリアより、MODファイル（<code>DeadAge_Brightness_Mod_v1.0.zip</code>）をダウンロードします。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 2</span>\n        <h3>ゲームのインストール先フォルダを開く</h3>\n        <p>Steamライブラリから『Dead Age』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>\n        <p><code>DeadAge.exe</code> が存在するゲームのルートフォルダが開きます。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 3</span>\n        <h3>ファイルをコピーしてゲーム起動</h3>\n        <p>ダウンロードしたZIPファイルを解凍し、中にある以下のファイル・フォルダをすべて『Dead Age』のインストールフォルダ（DeadAge.exeと同じ場所）にドラッグ＆ドロップでコピーしてください：</p>\n        <ul>\n          <li><code>winhttp.dll</code></li>\n          <li><code>doorstop_config.ini</code></li>\n          <li><code>BepInEx</code> (フォルダ)</li>\n        </ul>\n        <p>あとは通常どおりSteamからゲームを起動するだけでModが自動的に読み込まれます！</p>\n      </div>\n\n      <h2>アンインストール方法（元の状態に戻す）</h2>\n      <p>配置した以下のファイル・フォルダを削除するだけで、即座に元の状態に戻ります：</p>\n      <ul>\n        <li><code>winhttp.dll</code></li>\n        <li><code>doorstop_config.ini</code></li>\n        <li><code>BepInEx</code> (フォルダ)</li>\n      </ul>\n\n      <h2>免責事項・注意事項</h2>\n      <div style=\"background: rgba(255, 255, 255, 0.05); padding: 18px 24px; border-radius: 8px; border-left: 4px solid var(--accent, #e53e3e); margin-top: 16px;\">\n        <ul style=\"margin: 0; padding-left: 20px; line-height: 1.8;\">\n          <li><strong>非公式ツール:</strong> 本MODは一個人ファンによる非公式の視認性改善ツールです。ゲームの開発元（Silent Dreams）および販売元（Headup Games）とは一切関係ありません。</li>\n          <li><strong>自己責任の原則:</strong> 本MODの導入および利用は、すべてご利用者様ご自身の責任において行ってください。本MODの使用により生じたいかなる不具合等に関しましても、制作者は責任を負いかねます。</li>\n          <li><strong>日本語化MODとの併用について:</strong> 当サイトの「Dead Age 完全日本語化MOD」と完全に互換性があり、併用してプレイいただけます。</li>\n        </ul>\n      </div>\n    "
  },
  {
    "id": "dead-age",
    "title": "【Dead Age】完全日本語化MOD 配布・導入手順ガイド（Steam対応）",
    "summary": "ターン制ゾンビサバイバルRPG『Dead Age』の有志による完全日本語化MODです。全編にわたる会話・ストーリーの映画吹き替え風ローカライズ、敵名・スキル・装備名の自然な日本語化、さらに高品質日本語フォント（BIZ UDPゴシック）への完全置換を実施。",
    "category": "RPG / サバイバル",
    "game": "Dead Age",
    "version": "Ver 1.0 (2026.10.18)",
    "date": "2026-10-18",
    "featuredImage": "/images/dead-age-hero.png",
    "author": "JP Modding Team",
    "download": {
      "format": "ZIPアーカイブ (.zip)",
      "size": "約 93.3 MB",
      "gameVersion": "Steam 最新版対応",
      "assetName": "DeadAge_JP_Mod_v1.0.zip",
      "initialDownloads": 0,
      "mainUrl": "https://github.com/moddencom/mod-portal/releases/download/v1.1.0/DeadAge_JP_Mod_v1.0.zip",
      "mirrorUrl": "https://workupload.com/file/57PgZkSPcV5",
      "supportUrl": "https://ofuse.me/o?uid=227788"
    },
    "content": "\n      <h2>『Dead Age』完全日本語化MODについて</h2>\n      <p>『Dead Age』は、文明崩壊後の世界を生き抜くターン制コマンドバトルRPGです。キャンプ運営、仲間との人間関係、パーマデス、そしてマルチエンディングなど奥深いゲーム性を誇りますが、公式日本語は非対応（または機械翻訳）となっていました。</p>\n      <p>本MODでは、プレイヤーが没入できるよう<strong>全編のストーリー・セリフ・独白を洋画吹き替え風の自然な日本語に徹底ローカライズ</strong>。さらに機械翻訳特有の不自然な敵名（「レイジング・ベイグラント」「アンデッドラボアシスタント」等）や装備品・スキルの名称、UIレイアウトに至るまで完全に洗練しています。</p>\n\n      <blockquote>\n        <strong>💡 本MODの特徴:</strong><br>\n        ・<strong>完全自然なストーリー翻訳:</strong> 主人公ジャックのタフな独白、シェリフやトリッシュ、ハンクらの個性豊かな掛け合いを映画さながらの台詞回しに全面刷新<br>\n        ・<strong>モリサワ製 高品質ユニバーサルデザインフォント採用:</strong> 商用・再配布フリーの「BIZ UDPゴシック Bold」をUnityアセットに直接組み込み、見やすく美しいタイポグラフィを実現<br>\n        ・<strong>戦闘・敵名・装備の完全監修:</strong> 「耐久力」「会心率」「レジスト」「ニット帽」などゲーム用語として直感的な表記に統一<br>\n        ・<strong>ワンタッチ導入:</strong> ゲームフォルダにドラッグ＆ドロップするだけで即座にプレイ可能\n      </blockquote>\n\n      <h2>日本語化MODのスクリーンショット</h2>\n      <p>タイトル画面、サバイバル手帳、NPCたちとの熱い会話ドラマ、ショップや装備画面に至るまで、美しい日本語フォント（BIZ UDPゴシック）と自然な台詞回しで快適にプレイ可能です。</p>\n\n      <div style=\"display: flex; flex-direction: column; gap: 24px; margin: 24px 0;\">\n        <div>\n          <h4 style=\"margin-bottom: 8px; color: var(--text-heading, #fff);\">▼ タイトル画面（日本語メニュー表示）</h4>\n          <img src=\"/images/dead-age-preview-title.jpg\" alt=\"Dead Age 日本語化タイトル画面\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);\" />\n        </div>\n\n        <div>\n          <h4 style=\"margin-bottom: 8px; color: var(--text-heading, #fff);\">▼ ハンク＆リディアの会話シーン（映画吹き替え調の自然な台詞）</h4>\n          <img src=\"/images/dead-age-preview-hank-lydia.jpg\" alt=\"Dead Age ハンクのセリフ\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-bottom: 12px;\" />\n          <img src=\"/images/dead-age-preview-lydia.jpg\" alt=\"Dead Age リディアのセリフ\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); margin-bottom: 12px;\" />\n          <img src=\"/images/dead-age-preview-hank.jpg\" alt=\"Dead Age ハンクの掛け合い\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);\" />\n        </div>\n\n        <div>\n          <h4 style=\"margin-bottom: 8px; color: var(--text-heading, #fff);\">▼ ショップ＆アイテムインベントリ（UI・装備品名の最適化）</h4>\n          <img src=\"/images/dead-age-preview-shop.jpg\" alt=\"Dead Age ショップ画面\" style=\"width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);\" />\n        </div>\n      </div>\n\n      <h2>MODの導入手順（ステップ解説）</h2>\n      <p>導入は非常にシンプルです。ダウンロードしたZIPファイルを解凍し、ゲームフォルダに上書きするだけで完了します。</p>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 1</span>\n        <h3>MODファイルのダウンロード</h3>\n        <p>下記ダウンロードエリアより、最新のMODファイル（<code>DeadAge_JP_Mod_v1.0.zip</code>）をダウンロードします。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 2</span>\n        <h3>ゲームのインストール先フォルダを開く</h3>\n        <p>Steamライブラリから『Dead Age』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>\n        <p>ゲームの実行ファイル（<code>DeadAge.exe</code>）や <code>DeadAge_Data</code> フォルダが存在するフォルダが開きます。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 3</span>\n        <h3>ファイルを上書き配置してゲーム起動</h3>\n        <p>ダウンロードしたZIPを解凍し、中にある <code>DeadAge_Data</code> フォルダを『Dead Age』のインストールフォルダにドラッグ＆ドロップして上書きしてください。</p>\n        <p>ゲームを起動し、言語設定（画面右上の国旗アイコン）で「中文（中国国旗）」を選択すると、日本語化が完全に反映されます。</p>\n      </div>\n\n      <h2>アンインストール方法（元の状態に戻す）</h2>\n      <p>いつでも元の初期状態（公式バニラ）に戻すことができます。<br>\n      Steamライブラリで『Dead Age』を右クリック ＞「プロパティ」＞「インストール済みファイル」＞「ゲームファイルの整合性を確認」をクリックしてください。Steamによって公式ファイルが自動再ダウンロードされ、安全に復元されます。</p>\n\n      <h2>免責事項・注意事項</h2>\n      <div style=\"background: rgba(255, 255, 255, 0.05); padding: 18px 24px; border-radius: 8px; border-left: 4px solid var(--accent, #e53e3e); margin-top: 16px;\">\n        <ul style=\"margin: 0; padding-left: 20px; line-height: 1.8;\">\n          <li><strong>非公式パッチ:</strong> 本MODは一個人ファンによる有志の非公式日本語化パッチです。開発元（Silent Dreams）および販売元（Headup Games）とは一切関係ありません。公式サポートへのお問い合わせは固くお控えください。</li>\n          <li><strong>自己責任の原則:</strong> 本MODの導入および利用は、すべてご利用者様ご自身の責任において行ってください。本MODの使用により生じたいかなる不具合、セーブデータの破損、トラブル等に関しましても、制作者は一切の責任を負いかねます。大切なデータがある場合は事前のバックアップを推奨します。</li>\n          <li><strong>フォントライセンス:</strong> ゲーム内に組み込まれている日本語フォント「BIZ UDPゴシック」は、株式会社モリサワが提供するオープンソースフォント（SIL Open Font License 1.1）に基づき、正規に同梱・利用されています。</li>\n          <li><strong>著作権について:</strong> ゲーム本編のキャラクター、テキスト原案、画像、プログラム等の著作権はすべて原著作者に帰属します。本MODファイルの商用販売や無断再配布は禁止いたします。</li>\n        </ul>\n      </div>\n    "
  },
  {
    "id": "high-on-life",
    "title": "【High on Life】日本語化MOD 配布・導入手順ガイド（Steam / Game Pass対応）",
    "summary": "Rick and Mortyのクリエイターが手掛ける異色コメディFPS『High on Life』の有志日本語化MODです。全字幕・手紙・UIの完全ローカライズ、フォント置換により快適にプレイ可能です。",
    "category": "FPS / コメディ",
    "game": "High on Life",
    "version": "Ver 1.0 (2026.10.18)",
    "date": "2026-10-18",
    "featuredImage": "/images/high-on-life-hero.png",
    "author": "JP Modding Team",
    "download": {
      "format": "PAKファイル (.pak)",
      "size": "約 443 MB",
      "gameVersion": "Steam / Xbox Game Pass 最新版",
      "assetName": "Oregon-WindowsNoEditor_JP.pak",
      "initialDownloads": 1,
      "mainUrl": "https://github.com/moddencom/mod-portal/releases/download/v1.0.0/Oregon-WindowsNoEditor_JP.pak",
      "mirrorUrl": "https://workupload.com/file/NQ2BQR9sRD9",
      "supportUrl": "https://ofuse.me/o?uid=227788"
    },
    "content": "\n      <h2>『High on Life』日本語化MODについて</h2>\n      <p>『High on Life』は、軽快なトークと下品で強烈なギャグが魅力のSFアクションFPSですが、公式では日本語に対応していません。本MODを導入することで、ゲーム内の字幕、銃（ガトリアン）たちの掛け合い、アイテム説明、イベントレターなどがすべて自然な日本語で表示されるようになります。</p>\n\n      <blockquote>\n        <strong>💡 本MODの特徴:</strong><br>\n        ・ゲーム内全49箇所のフォントを読みやすい高品質日本語フォントに完全置換<br>\n        ・英語に巻き戻ってしまう不具合（ハッシュ値不一致）を完全修正済み<br>\n        ・字幕の文字見切れ・はみ出しを防ぐ最適化改行処理を適用\n      </blockquote>\n\n      <h2>日本語化MODのスクリーンショット</h2>\n      <p>ゲーム内の会話字幕やメニュー画面、各種UIが以下のように日本語で違和感なく表示されます。</p>\n      <img src=\"/images/hol-preview-gameplay.png\" alt=\"High on Life 日本語化ゲーム画面\" />\n\n      <h2>MODの導入手順（ステップ解説）</h2>\n      <p>導入は非常に簡単です。ダウンロードしたPAKファイルを指定のフォルダに配置するだけで完了します。</p>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 1</span>\n        <h3>MODファイルのダウンロード</h3>\n        <p>下記ダウンロードエリアより、最新のMODファイル（<code>Oregon-WindowsNoEditor_JP.pak</code>）をダウンロードします。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 2</span>\n        <h3>ゲームのインストール先フォルダを開く</h3>\n        <p>Steamライブラリから『High on Life』を右クリック ＞「管理」＞「ローカルファイルを閲覧」をクリックします。</p>\n        <p>以下のフォルダを開いてください：<br>\n        <code>Oregon\\Content\\Paks\\~mods\\</code><br>\n        ※<code>~mods</code> フォルダが存在しない場合は、新規作成してください。</p>\n      </div>\n\n      <div class=\"step-box\">\n        <span class=\"step-num\">STEP 3</span>\n        <h3>ファイルを配置してゲーム起動</h3>\n        <p>ダウンロードしたPAKファイルを <code>~mods</code> フォルダ内にそのままコピー＆ペーストします。ゲームを起動すると自動的に日本語化が適用されます。</p>\n      </div>\n\n      <h2>アンインストール方法</h2>\n      <p><code>~mods</code> フォルダに配置した <code>Oregon-WindowsNoEditor_JP.pak</code> を削除するだけで、安全に元の英語版に戻すことができます。</p>\n\n      <h2>免責事項・注意事項</h2>\n      <ul>\n        <li>本MODは有志による非公式パッチです。開発元・販売元とは一切関係ありません。</li>\n        <li>MODの導入は自己責任にてお願いいたします。</li>\n        <li>ゲーム本体の将来的な大型アップデートにより、一時的に動作しなくなる場合があります。その際は本ポータルサイトにて修正パッチを配布いたします。</li>\n      </ul>\n    "
  }
];
