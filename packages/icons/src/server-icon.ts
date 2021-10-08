import { _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import { h, forwardRef } from "@hydrophobefireman/ui-lib";

import { IconProps } from "./types";

export const ServerIcon = forwardRef(function ServerIcon(
  $props: IconProps,
  ref
) {
  const { size, color, ...rest } = $props;
  const _size = size ? _util.toPx(size) : "24px";
  const props = _util.extend(rest, { height: _size, width: _size });
  return h(
    BaseDom,
    _util.extend(
      {
        fill: "none",
        ref: ref as any,
        viewBox: "0 0 24 24",
        element: "svg",
        stroke: color || "var(--kit-theme-fg)",
      },
      props
    ),
    h("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": 2,
      d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    })
  );
});
