/**
 * Cloudflare Pages Functions: Block public access to /admin
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
