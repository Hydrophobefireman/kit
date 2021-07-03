export function nullOr(x: any, y: any) {
  if (x === void 0 || x === null) {
    return y;
  }
  return x;
}
