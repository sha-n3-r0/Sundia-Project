/**
 * Build a browser-loadable URL for stored public paths (/storage/..., foo.png).
 * Prefer Ziggy.url (request root) so subfolder installs work when paths are root-relative.
 */
export function publicAssetUrl(path) {
    if (path == null || path === '') {
        return null;
    }
    const s = String(path).trim();
    if (/^(https?:|blob:|data:)/i.test(s)) {
        return s;
    }
    const rel = s.replace(/^\/+/, '').replace(/\\/g, '/');
    const ziggy = typeof window !== 'undefined' ? window.Ziggy : null;
    const base = ziggy?.url ? String(ziggy.url).replace(/\/$/, '') : '';
    if (base) {
        return `${base}/${rel}`;
    }
    return `/${rel}`;
}
