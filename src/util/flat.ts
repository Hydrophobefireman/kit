type Mapper<T> = (x: T, i: number) => T;
export const flat = [].flat
  ? function <T extends Array<any>>(
      arr: T,
      mapper?: Mapper<T>,
      depth: number = Infinity
    ) {
      const ret = arr.flat(depth);
      if (mapper) return ret.map(mapper) as T;
      return ret as T;
    }
  : function <T extends Array<any>>(
      arr: T,
      mapper?: Mapper<T>,
      depth: number = Infinity
    ) {
      let ret: T;
      if (depth) {
        const acc = [] as T;
        arr.forEach((x) => {
          if (Array.isArray(x)) {
            acc.push(...flat(x, mapper, depth - 1));
          } else {
            acc.push(x);
          }
        });
        ret = acc;
      } else {
        ret = arr.slice() as T;
      }
      if (mapper) return ret.map(mapper) as T;
      return ret as T;
    };
