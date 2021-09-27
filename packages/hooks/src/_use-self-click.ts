export function useSelfClick(cb: void | ((e: MouseEvent) => any)) {
  return function (e: MouseEvent) {
    e.currentTarget === e.target && cb && cb(e);
  };
}
