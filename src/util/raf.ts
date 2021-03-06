import {warn} from "./warn";

if (typeof requestAnimationFrame !== "function") {
  (window as any).requestAnimationFrame = warn(
    (cb) => setTimeout(cb, 0),
    "No request animation frame implementation found"
  );
}
export function raf(cb: FrameRequestCallback) {
  return requestAnimationFrame(cb);
}

export function buildRaf(cb: FrameRequestCallback) {
  return () => raf(cb);
}
