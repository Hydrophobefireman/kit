export const sanitizeRegExp = /([^\w]|_)/g;
export const clean = (x: any) =>
  (x + "").replace(sanitizeRegExp, "").toLowerCase();
export const contains = (b: any, a: any) => clean(b).includes(clean(a));

// sentinel that indicates user is focused on the input and the next arrow event targets
// an extreme of the list
export const __BLANK__: any = {};
