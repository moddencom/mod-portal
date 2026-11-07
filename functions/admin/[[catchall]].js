/**
 * Cloudflare Pages Functions: Block public access to /admin/*
 * 
 * 管理ツール（Admin Studio）はローカル環境（`起動_MOD管理ツール.bat` -> localhost:3333）でのみ使用するため、
 * 本番の公開サイト（modden.com/admin/*）ではすべて404 Not Foundとして遮断します。
 */

export async function onRequest() {
  return new Response('404 Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
