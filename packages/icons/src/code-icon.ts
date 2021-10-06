import { _util } from "@hydrophobefireman/kit";
import { h } from "@hydrophobefireman/ui-lib";

import { IconProps } from "./types";

export function CodeIcon($props: IconProps) {
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
      d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    })
  );
}
