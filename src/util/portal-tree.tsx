import { h, render, useEffect, useState } from "@hydrophobefireman/ui-lib";

import { ID_PREFIX } from "./random";

let num = 0;
export class PortalTree {
  protected portalKey: string;

  protected children: Map<string, JSX.Element> = new Map();
  constructor() {
    this.portalKey = `UI-PORTAL:${ID_PREFIX}:${++num}`;
  }
  protected _rendered = false;
  dispatch() {
    dispatchEvent(new Event(this.portalKey));
  }
  root = () => {
    const [, r] = useState({});
    useEffect(() => {
      const f = () => r({});
      window.addEventListener(this.portalKey, f);
      return () => window.removeEventListener(this.portalKey, f);
    }, []);
    return this.render();
  };
  render() {
    return this.children && Array.from(this.children.values());
  }
  protected _getContainer() {
    const div = document.createElement("div");
    div.setAttribute(this.portalKey, "");
    return div;
  }
  init() {
    if (this._rendered) return;
    this._rendered = true;
    const div = this._getContainer();
    document.body.appendChild(div);
    render(h(this.root)!, div);
  }
  unmount(x: string) {
    this.children && this.children.delete(x);
  }
  child(id: string, x: JSX.Element) {
    this.children.set(id, x);
  }
}
