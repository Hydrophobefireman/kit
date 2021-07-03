export function getDocElAttribute(key: string) {
  if (typeof window === "undefined") return;
  return document.documentElement.getAttribute(key);
}

export function setDocElAttribute(key: string, value: any) {
  if (typeof window === "undefined") return;
  return document.documentElement.setAttribute(key, value);
}
