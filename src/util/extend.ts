const hasOwn = Object.prototype.hasOwnProperty;

export const extend =
  Object.assign ||
  function extend(target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      for (const key in source) {
        if (hasOwn.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
