import { _util } from "@hydrophobefireman/kit";
import { h } from "@hydrophobefireman/ui-lib";

import { IconProps } from "./types";

export function CameraIcon($props: IconProps) {
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
      d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
    }),
    h("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z",
    })
  );
}
