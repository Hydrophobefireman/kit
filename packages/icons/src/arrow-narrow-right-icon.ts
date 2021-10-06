import { _util } from "@hydrophobefireman/kit";
import { h } from "@hydrophobefireman/ui-lib";

import { IconProps } from "./types";

export function ArrowNarrowRightIcon($props: IconProps) {
  const { size, ...rest } = $props;
  const _size = size ? _util.toPx(size) : "24px";
  const props = _util.extend(rest, { height: _size, width: _size });
  return h(
    "svg",
    _util.extend(
      {
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
      },
      props
    ),
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 8l4 4m0 0l-4 4m4-4H3",
    })
  );
}
