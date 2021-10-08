import { _util } from "@hydrophobefireman/kit";
import { BaseDom } from "@hydrophobefireman/kit/base-dom";
import { h, forwardRef } from "@hydrophobefireman/ui-lib";

import { IconProps } from "./types";

export const PresentationChartLineIcon = forwardRef(
  function PresentationChartLineIcon($props: IconProps, ref) {
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
        d: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
      })
    );
  }
);
