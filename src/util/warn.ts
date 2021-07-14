export function warn<T>(x: T, message: string): T {
  if (process.env.NODE_ENV === "development") {
    console.warn(message);
  }
  return x;
}

export function warnOnce() {
  let count = 0;
  return <T>(x: T, message: string) => {
    if (count++) return x;
    return warn(x, message);
  };
}
