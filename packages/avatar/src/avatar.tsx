import {BaseElement, _util} from "@hydrophobefireman/kit";
import {Box} from "@hydrophobefireman/kit/container";
import {h} from "@hydrophobefireman/ui-lib";

import {AvatarProps} from "./types";

const variantToBorderRadiusMap = new Map<AvatarProps["variant"], string>([
  ["circle", "50%"],
  ["square", "0"],
  ["rounded", "10px"],
]);
export function Avatar({
  height,
  width,
  style,
  src,
  variant,
  text,
  ...rest
}: BaseElement<AvatarProps>) {
  _util.guardCss(style);
  const borderRadius = _util.toPx(
    variantToBorderRadiusMap.get(variant || "circle")
  );
  const css = _util.extend(
    {
      borderRadius,
      backgroundColor: "#bdbdbd",
      fontSize: "1.2rem",
      userSelect: "none",
    },
    style,
    {
      width: _util.toPx(width == null ? 40 : width),
      height: _util.toPx(height == null ? 40 : width),
    }
  );
  return h(
    Box,
    _util.extend({}, rest, {
      horiontal: "center",
      vertical: "center",
      style: css,
    }),
    [
      src && (
        <img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            objectFit: "cover",
            color: "transparent",
            textIndent: 10000,
            borderRadius,
          }}
          children={null as any}
        />
      ),
      !src && text && <div>{text}</div>,
    ]
  );
}
