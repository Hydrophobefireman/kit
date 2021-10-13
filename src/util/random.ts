const KIT_PREFIX = "kit-auto-id-";
export function random() {
  return Math.random().toString(36).substring(2);
}
export function randomPrefix() {
  return KIT_PREFIX + random();
}

export const ID_PREFIX = randomPrefix();
