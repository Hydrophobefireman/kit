import {_util} from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";

import {BaseSnackbar} from "./base-snackbar";
import {ToastOptions} from "./types";

class UITree extends _util.PortalTree {
  private alertStack: Map<ToastOptions, boolean> = new Map();

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
  _getContainer() {
    const div = super._getContainer();
    div.className = classnames.snackbarContainer;
    return div;
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
  return {hide: buildAlert(options)};
}
