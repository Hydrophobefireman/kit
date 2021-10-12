import { _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import { buildPortal } from "@hydrophobefireman/kit/build-portal";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  defaultRect,
  useMutationObserver,
  useRect,
  useResize,
  useScroll,
} from "@hydrophobefireman/kit/hooks";
import { useEffect } from "@hydrophobefireman/ui-lib";

import { DropdownProps } from "./types";

function _Dropdown(props: DropdownProps) {
  if (!props.parent) return <></>;
  const cls = [classnames.dropdown, props.class, props.className];
  const { rect, sync } = useRect(props.parent, props.sibling);
  useResize(sync);
  useScroll(sync);
  useMutationObserver(props.parent.current, sync);

  useEffect(sync, cls);
  if (rect === defaultRect) return <></>;
  return (
    <BaseDom
      block
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

export const Dropdown = buildPortal<DropdownProps, typeof _Dropdown>(
  "Dropdown",
  _Dropdown
);
