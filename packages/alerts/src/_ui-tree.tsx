import * as classnames from "@hydrophobefireman/kit/classnames";
import { useMount, useRerender } from "@hydrophobefireman/kit/hooks";
import { h, render } from "@hydrophobefireman/ui-lib";

import { BaseSnackbar } from "./base-snackbar";
import { ALERT_ID } from "./constants";
import { ToastOptions } from "./types";

class UITree {
  private alertStack: Map<ToastOptions, boolean> = new Map();
  private _rendered = false;
  _renderOne(x: ToastOptions, isActive: boolean, i: number) {
    return (
      <BaseSnackbar
        x={x}
        isActive={isActive}
        i={i}
        alertStack={this.alertStack}
        pop={this.pop}
        remove={this._remove}
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
    dispatchEvent(new Event(ALERT_ID));
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
  pop = (x: ToastOptions) => {
    if (!this.alertStack.has(x)) return;
    this.alertStack.set(x, false);
    this.dispatch();
  };
  _remove = (x: ToastOptions) => {
    this.alertStack.delete(x);
    this.dispatch();
  };
}
const tree = new UITree();

function C() {
  const rerender = useRerender();
  useMount(() => {
    addEventListener(ALERT_ID, rerender);
    return () => removeEventListener(ALERT_ID, rerender);
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
