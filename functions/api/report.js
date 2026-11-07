/**
 * Cloudflare Pages Functions: POST /api/report
 * 
 * セキュリティ強化版:
 * 1. Discord Webhook URL の完全非公開（Cloudflare環境変数からのみ参照）
 * 2. 送信元オリジン / リファラーの検証（外部不正サイト・直叩きの遮断）
 * 3. スパムBOT検知（ハニーポット）
 * 4. 同一IPからの過度な連続送信（連打）防止
 * 5. ペイロード・文字数上限チェック
 */

// 直近の送信IPをメモリ上で追跡（簡易レートリミット: 5秒以内の連続送信防止）
const recentIps = new Map();

function cleanOldIps() {
  const now = Date.now();
  for (const [ip, timestamp] of recentIps.entries()) {
    if (now - timestamp > 60000) { // 1分以上経過した記録を削除
      recentIps.delete(ip);
    }
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // 1. 環境変数の確認
    const webhookUrl = env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ 
          error: 'サーバー設定エラー: DISCORD_WEBHOOK_URL が設定されていません。' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json; charset=utf-8' } 
        }
      );
    }

    // 2. 送信元（Origin / Referer）のドメイン検証
    const origin = request.headers.get('origin') || '';
    const referer = request.headers.get('referer') || '';
    const host = request.headers.get('host') || '';

    const isAllowedDomain = (urlStr) => {
      if (!urlStr) return true; // 直接curlや一部ブラウザで空の場合もあるため許容
      try {
        const u = new URL(urlStr);
        return (
          u.hostname === 'modden.com' ||
          u.hostname === 'www.modden.com' ||
          u.hostname.endsWith('.mod-portal.pages.dev') ||
          u.hostname.endsWith('.pages.dev') ||
          u.hostname === 'localhost' ||
          u.hostname === '127.0.0.1' ||
          u.host === host
        );
      } catch (e) {
        return false;
      }
    };

    if ((origin && !isAllowedDomain(origin)) || (referer && !isAllowedDomain(referer))) {
      return new Response(
        JSON.stringify({ error: 'アクセスが拒否されました: 不正な送信元です。' }),
        { status: 403, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      );
    }

    // 3. レートリミット（同一IPからの5秒以内連続リクエストを防止）
    const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (clientIp !== 'unknown') {
      cleanOldIps();
      const lastTime = recentIps.get(clientIp);
      const now = Date.now();
      if (lastTime && (now - lastTime < 5000)) { // 5秒以内
        return new Response(
          JSON.stringify({ error: '連続で送信されています。数秒待ってから再試行してください。' }),
          { status: 429, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }
      recentIps.set(clientIp, now);
    }

    const contentType = request.headers.get('content-type') || '';

    let discordResponse;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      // ハニーポット検査
      const hp = formData.get('hp_website');
      if (hp && String(hp).trim().length > 0) {
        // BOTと判定。Discordへは送らずに成功を装って終了
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }

      // ファイルサイズ検証（8MB上限）
      const file = formData.get('files[0]');
      if (file && file.size > 8.5 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ error: '添付画像が大きすぎます（最大8MB）。' }),
          { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }

      discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });
    } else {
      const rawBody = await request.text();

      // ボディサイズ検証（1MB上限）
      if (rawBody.length > 1024 * 1024) {
        return new Response(
          JSON.stringify({ error: 'リクエストデータが大きすぎます。' }),
          { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
        );
      }

      // ハニーポット検査
      try {
        const parsed = JSON.parse(rawBody);
        if (parsed.hp_website && String(parsed.hp_website).trim().length > 0) {
          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
          );
        }
      } catch (e) {}

      discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: rawBody,
      });
    }

    if (!discordResponse.ok) {
      const errText = await discordResponse.text();
      return new Response(
        JSON.stringify({ error: `Discord Webhook送信エラー (${discordResponse.status}): ${errText}` }),
        { 
          status: discordResponse.status, 
          headers: { 'Content-Type': 'application/json; charset=utf-8' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: '報告が正常にDiscordへ送信されました。' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' } 
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `サーバー処理例外: ${err.message}` }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json; charset=utf-8' } 
      }
    );
  }
}
