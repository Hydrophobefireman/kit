export const warn =
  process.env.NODE_ENV === "development"
    ? function warn<T>(x: T, message: string): T {
        console.warn(message);
        return x;
      }
    : function warn<T>(x: T, _: any) {
        return x;
      };

export function warnOnce() {
  let count = 0;
  return <T>(x: T, message: string) => {
    if (count++) return x;
    return warn(x, message);
  };
}
