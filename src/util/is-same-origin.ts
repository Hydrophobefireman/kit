export function isSameOrigin(url: string) {
  if (typeof window === "undefined" || !url) return false;
  const u = new URL(url, location.href);
  return u.hostname === location.hostname;
}
