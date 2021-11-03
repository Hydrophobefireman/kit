export function flatPollyill() {
  if (!Array.prototype.flat) {
    function f(depth: number) {
      return depth
        ? Array.prototype.reduce.call(
            this,
            function (acc: any, cur: any) {
              if (Array.isArray(cur)) {
                acc.push.apply(acc, f.call(cur, depth - 1));
              } else {
                acc.push(cur);
              }
              return acc;
            },
            []
          )
        : Array.prototype.slice.call(this);
    }
    Object.defineProperty(Array.prototype, "flat", {
      configurable: true,
      value: f,
      writable: true,
    });
  }
}
