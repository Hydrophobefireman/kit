import { Route, Router, dynamic } from "@hydrophobefireman/kit/router";

import { A } from "@hydrophobefireman/ui-lib";
import { Path } from "@hydrophobefireman/ui-lib";

function getDynamic(x: any) {
  return dynamic(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(function F(y) {
              // console.log(y);
              return x;
            }),
          1500
        )
      )
  );
}
const Root = getDynamic(
  <div>
    <A href="/1">Page 1</A>
    <div>
      <A href="/o/2">Page 2</A>
    </div>
  </div>
);
const Page1 = getDynamic(
  <div>
    <A href="/">Home</A>
    <div>
      <A href="/o/2">Page 2</A>
    </div>
  </div>
);
const Page2 = getDynamic(
  <div>
    <A href="/">Home</A>
    <div>
      <A href="/1">Page 1</A>
    </div>
  </div>
);
export function RouterTest() {
  // console.log("1")
  return (
    <Router
      paths={{
        "/": { component: Root },
        "/1": { component: Page1 },
        "/o/:ok": { component: Page2 },
      }}
    ></Router>
  );
}
