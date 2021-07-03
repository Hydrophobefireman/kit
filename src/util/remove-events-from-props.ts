export function removeEventsFromProps<T>(
  x: T
): Omit<T, keyof JSX.DOMEvents<any>> {
  const r = {} as T;
  for (const i in x) {
    if (i[0] == "o" && i[1] == "n") {
      continue;
    }
    r[i] = x[i];
  }
  return r;
}
