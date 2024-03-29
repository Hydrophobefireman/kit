import {Button} from "@hydrophobefireman/kit/button";
import {Modal} from "@hydrophobefireman/kit/modal";
import {Router, dynamic} from "@hydrophobefireman/kit/router";
import {redirect} from "@hydrophobefireman/ui-lib";

function getDynamic(x: any) {
  let loadedOnce = false;
  return dynamic(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(function F() {
              return x;
            }),
          15,
        ),
      ),
  );
}

function RouteButton({href, text}: any) {
  return (
    <Button
      label={text}
      variant="shadow"
      mode="secondary"
      href={href}
      preserveScroll
      style={{margin: "10px"}}
    >
      {text}
    </Button>
  );
}
const Root = getDynamic(
  <div>
    <RouteButton href="/1" text="Page 1" />
    <RouteButton href="/o/2" text="Page 2" />
  </div>,
);
const Page1 = getDynamic(
  <div>
    <RouteButton href="/" text="Home" />
    <RouteButton href="/o/2" text="Page 2" />
  </div>,
);
const Page2 = getDynamic(
  <div>
    <RouteButton href="/" text="Home" />
    <RouteButton href="/1" text="Page 1" />
    <Modal active>
      <Modal.Body>
        Hello!
        <button
          onClick={() => {
            setTimeout(() => {
              redirect("/1");
            });
          }}
        >
          {" "}
          ok
        </button>
      </Modal.Body>
    </Modal>
  </div>,
);
export function RouterTest() {
  return (
    <Router
      // transitionStyle={{ }}
      paths={{
        "/": {component: Root},
        "/1": {component: Page1},
        "/o/:ok": {component: Page2},
      }}
    />
  );
}
