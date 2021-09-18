import { Button } from "@hydrophobefireman/kit/button";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { useMount, useRerender } from "@hydrophobefireman/kit/hooks";
import { Transition } from "@hydrophobefireman/kit/transition";
import { h, render } from "@hydrophobefireman/ui-lib";

import { ToastOptions } from "./types";

const CUSTOM_EVENT_KEY = `KIT-ALERT-IMPL-${Math.random()
  .toString(32)
  .substring(2)}`;

class UITree {
  private alertStack: Map<ToastOptions, boolean> = new Map();
  private _rendered = false;
  _renderOne(x: ToastOptions, isReady: boolean, i: number) {
    const andClose = (fn: any, isCancel?: boolean) => {
      console.log(isReady, x);
      if (!isReady) return;
      return (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        fn();
        if (isCancel || !x.preventClose) this.pop(x);
      };
    };
    return (
      <Transition
        id={isReady ? i : ""}
        role="alert"
        leaveClass={classnames.snackbarLeave}
        style={{ bottom: `${Math.max(0, 15 * (this.alertStack.size - i))}px` }}
        class={[classnames.moveUp, classnames.snackbarRoot, classnames.flex]}
        transitionHook={() => !isReady && this._remove(x)}
        render={
          isReady ? (
            <>
              <span>{x.content}</span>
              <Container horizontal="right" row vertical="center" flex={1}>
                {x.onActionClick && (
                  <Button
                    class={classnames.snackbarButton}
                    variant="shadow"
                    onClick={andClose(x.onActionClick)}
                    label={
                      typeof x.actionText === "string" ? x.actionText : "okay"
                    }
                  >
                    {x.actionText || "okay"}
                  </Button>
                )}
                {x.onCancelClick && (
                  <Button
                    onClick={andClose(x.onCancelClick, true)}
                    class={classnames.snackbarButton}
                    variant="shadow"
                    mode="secondary"
                    label={
                      typeof x.cancelText === "string" ? x.cancelText : "cancel"
                    }
                  >
                    {x.cancelText || "cancel"}
                  </Button>
                )}
              </Container>
            </>
          ) : null
        }
      />
    );
  }
  init() {
    if (this._rendered) return;
    this._rendered = true;
    const div = document.createElement("div");
    div.className = classnames.snackbarContainer;
    document.body.appendChild(div);
    render(h(C) as any, div);
  }
  dispatch() {
    dispatchEvent(new Event(CUSTOM_EVENT_KEY));
  }
  render() {
    return Array.from(this.alertStack.entries()).map(([options, isActive], i) =>
      this._renderOne(options, isActive, i)
    );
  }
  add(x: ToastOptions) {
    this.alertStack.get(x) !== false && this.alertStack.set(x, true);
    this.dispatch();
  }
  pop(x: ToastOptions) {
    this.alertStack.set(x, false);
    this.dispatch();
  }
  private _remove(x: ToastOptions) {
    this.alertStack.delete(x);
    this.dispatch();
  }
}
const tree = new UITree();

function C() {
  const rerender = useRerender();
  useMount(() => {
    addEventListener(CUSTOM_EVENT_KEY, rerender);
    return () => removeEventListener(CUSTOM_EVENT_KEY, rerender);
  });
  return tree.render();
}

function buildAlert(options: ToastOptions) {
  tree.add(options);
  tree.init();
  return () => tree.pop(options);
}

export function show(options: ToastOptions) {
  const hide = buildAlert(options);
  const t = options.time || 2000;
  setTimeout(hide, t);
}

export function persist(options: ToastOptions) {
  return { hide: buildAlert(options) };
}
