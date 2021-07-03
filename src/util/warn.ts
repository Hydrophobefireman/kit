export function warn<T>(x: T, message: string): T {
  if (process.env.NODE_ENV === "development") {
    console.warn(message);
  }
  return x;
}
