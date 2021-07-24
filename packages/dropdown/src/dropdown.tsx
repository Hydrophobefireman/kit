import { _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {
  useObserver,
  useResize,
  useScroll,
} from "@hydrophobefireman/kit/hooks";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@hydrophobefireman/ui-lib";

import { DropdownProps, OffsetRect } from "./types";
import { defaultRect, getOffsetRect } from "./util";

export function Dropdown(props: DropdownProps) {
  if (!props.parent) return null;
  const cls = [classnames.dropdown, props.class, props.className];
  const ref = useRef<HTMLDivElement>();
  const [rect, setRect] = useState<OffsetRect>(defaultRect);
  const sync = useCallback(function sync() {
    setRect(getOffsetRect(props.parent, ref.current));
  }, []);
  useResize(sync);
  useScroll(sync);
  useObserver(props.parent, sync);

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
