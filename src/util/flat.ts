import { flatPollyill } from "./_flatpollyfill";

type Mapper<T> = (x: T, i: number) => T;
flatPollyill();
export const flat = function <T extends Array<any>>(
  arr: T,
  mapper?: Mapper<T>,
  depth: number = Infinity
) {
  const ret = arr.flat(depth);
  if (mapper) return ret.map(mapper) as T;
  return ret as T;
};
