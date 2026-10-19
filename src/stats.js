/**
 * GitHub Releases APIからアセットごとのダウンロード数を取得・キャッシュするユーティリティ
 */
const GITHUB_RELEASES_API = 'https://api.github.com/repos/moddencom/mod-portal/releases';
const CACHE_KEY = 'mod_portal_download_counts';
const CACHE_TIME_KEY = 'mod_portal_download_counts_time';
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3分間キャッシュ

export async function getDownloadCounts() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
  if (cached && cachedTime && (Date.now() - Number(cachedTime) < CACHE_DURATION_MS)) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  try {
    const res = await fetch(GITHUB_RELEASES_API);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const releases = await res.json();
    const counts = {};
    releases.forEach(r => {
      (r.assets || []).forEach(a => {
        if (a.name) {
          counts[a.name] = a.download_count || 0;
        }
      });
    });
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(counts));
    sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    return counts;
  } catch (err) {
    console.warn('Failed to fetch live download counts from GitHub:', err);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return {};
  }
}
