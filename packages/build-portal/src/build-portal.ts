import { ComplexComponent, _util } from "@hydrophobefireman/kit";
import { useId, useMount, useRestoreFocus } from "@hydrophobefireman/kit/hooks";
import { h, useEffect } from "@hydrophobefireman/ui-lib";

const { PortalTree } = _util;
export function buildPortal<
  P extends { active?: boolean },
  C extends ComplexComponent
>(name: string, rootContainer: C) {
  const p = new PortalTree();

  function Component(props: P) {
    const restore = useRestoreFocus();
    useEffect(() => {
      if ("active" in props) if (!props.active) restore();
    }, [props.active]);
    useMount(() => p.init());
    const id = useId();
    const C = h(rootContainer, props)!;
    useEffect(() => {
      p.child(id, C);
      p.dispatch();
    });
    useMount(() => () => {
      p.unmount(id);
      p.dispatch();
    });
    return null;
  }
  Object.defineProperty(Component, "name", { value: name });
  return Component;
}
