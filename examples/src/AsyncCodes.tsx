import { dynamic } from "@hydrophobefireman/kit/router";
const Hello = dynamic(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve((() => <div>Hello</div>) as any), 2000)
    ),
  {}
);
export function AsyncCodes() {
  return <>{(<Hello />) as any}</>;
}
