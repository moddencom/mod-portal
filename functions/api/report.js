/**
 * Cloudflare Pages Functions: POST /api/report
 * 
 * クライアントから受け取った報告内容（JSONまたは画像付きmultipart/form-data）を、
 * Cloudflareの環境変数 `DISCORD_WEBHOOK_URL` に安全に転送します。
 * これにより、フロントエンドやGitHubリポジトリにWebhook URLを一切露出させずに通知できます。
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // Cloudflare Pages の環境変数から Webhook URL を取得
    const webhookUrl = env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ 
          error: 'サーバー設定エラー: DISCORD_WEBHOOK_URL が設定されていません。Cloudflareダッシュボードの「設定」→「環境変数」にて登録してください。' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json; charset=utf-8' } 
        }
      );
    }

    const contentType = request.headers.get('content-type') || '';

    let discordResponse;
    if (contentType.includes('multipart/form-data')) {
      // 画像ファイル添付がある場合
      const formData = await request.formData();
      discordResponse = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });
    } else {
      // 通常のテキスト/JSON送信の場合
      const rawBody = await request.text();
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
