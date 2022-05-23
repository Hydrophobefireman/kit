export function eventPath(e: Event) {
  let __path: EventTarget[];
  const $path = e.composedPath
    ? e.composedPath()
    : (__path = (e as any).path) && __path.length
    ? __path
    : [];
  return $path;
}
