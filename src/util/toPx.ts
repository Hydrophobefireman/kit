export function toPx(value: any) {
  return typeof value === "number" ? `${value}px` : value;
}
