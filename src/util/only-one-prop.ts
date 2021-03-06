export function onlyOneProp<T>(arr: string[], props: T, message: any) {
  let count = 0;
  let common = [];
  for (const i in props) {
    if (arr.indexOf(i) > -1 && props[i] !== undefined) {
      (common as any).push(i);
      count++;
    }
  }
  if (count > 1) {
    console.warn("incompatible prop keys:", common);
    throw new Error(message);
  }
  return common[0];
}
