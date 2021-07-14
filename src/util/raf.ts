export function raf(cb: FrameRequestCallback) {
  return requestAnimationFrame(cb);
}

export function buildRaf(cb: FrameRequestCallback) {
  return () => raf(cb);
}
