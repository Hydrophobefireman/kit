import { DOMClass } from "../types";
import { flat } from "./flat";

export function createClassProp(c: DOMClass): string {
  return flat([c], (obj: any) => {
    if (typeof obj === "string" || typeof obj === "number") return obj;
    if (Array.isArray(obj)) return obj;

    let next: any[] = [];

    for (const key in obj as any) {
      if (obj[key]) {
        next.push(key);
      }
    }
    return next.join(" ");
  })
    .filter(Boolean)
    .join(" ");
}
