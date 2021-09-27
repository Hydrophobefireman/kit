export function useSelfEvent<T extends Event>(cb: void | ((e: T) => any)) {
  return function (e: T) {
    e.currentTarget === e.target && cb && cb(e);
  };
}
