import { _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  defaultRect,
  useMutationObserver,
  useRect,
  useResize,
  useScroll,
} from "@hydrophobefireman/kit/hooks";
import { useEffect, useRef } from "@hydrophobefireman/ui-lib";

import { DropdownProps } from "./types";

export function Dropdown(props: DropdownProps) {
  if (!props.parent) return null;
  const cls = [classnames.dropdown, props.class, props.className];
  const ref = useRef<HTMLDivElement>();
  const props__parent = useRef(props.parent);
  const { rect, sync } = useRect(props__parent, ref);
  useResize(sync);
  useScroll(sync);
  useMutationObserver(props.parent, sync);

  useEffect(sync, cls);
  _util.applyRef(props.dom, ref.current);
  if (rect === defaultRect) return null;
  return (
    <BaseDom
      block
      dom={ref}
      class={cls}
      style={_util.extend(
        {
          top: `${rect.top}px`,
          left: `${rect.left + 2}px`,
          width: `${rect.width}px`,
        },
        props.style
      )}
    >
      {props.children}
    </BaseDom>
  );
}
