export function guardObject(x: any, message: string): x is Record<string, any> {
  if (!x || typeof x !== "object") throw new TypeError(message);
  return true;
}

export function guardCss(style: any): style is { [k: string]: any } {
  return !style || guardObject(style, "Only object css allowed");
}

export function guardBoolean(x: any, message: string): x is boolean {
  if (typeof x !== "boolean") throw new TypeError(message);
  return true;
}

export function guardExists<T>(x: T, message: string): T {
  if (!x) throw new Error(message);
  return x;
}
