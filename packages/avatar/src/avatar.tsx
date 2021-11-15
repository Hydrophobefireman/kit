import {BaseElement, _util} from "@hydrophobefireman/kit";
import {Box} from "@hydrophobefireman/kit/container";
import {forwardRef, h} from "@hydrophobefireman/ui-lib";

import {AvatarProps} from "./types";

const variantToBorderRadiusMap = new Map<AvatarProps["variant"], string>([
  ["circle", "50%"],
  ["square", "0"],
  ["rounded", "10px"],
]);
const altWarning = _util.warnOnce();
export const Avatar = forwardRef<BaseElement<AvatarProps>>(function Avatar(
  {
    height,
    width,
    style,
    src,
    alt,
    variant,
    text,
    ...rest
  }: BaseElement<AvatarProps>,
  ref
) {
  if (src && !alt) altWarning(null, "Supply alt text!");
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
    _util.extend({ref}, rest, {
      horiontal: "center",
      vertical: "center",
      style: css,
    }),
    [
      src && (
        <img
          src={src}
          alt={alt}
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
});
