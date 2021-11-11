import {BaseElement, _util} from "@hydrophobefireman/kit";
import {Box} from "@hydrophobefireman/kit/container";

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
}: BaseElement<AvatarProps>) {
  _util.guardCss(style);
  const css = _util.extend(
    {
      borderRadius: variantToBorderRadiusMap.get(variant || "circle"),
      backgroundColor: "#bdbdbd",
      fontSize: "1.2rem",
    },
    style,
    {
      width: _util.toPx(width == null ? 40 : width),
      height: _util.toPx(height == null ? 40 : width),
    }
  );
  return (
    <Box horizontal="center" vertical="center" style={css}>
      {src && (
        <img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            objectFit: "cover",
            color: "transparent",
            textIndent: 10000,
          }}
        />
      )}
      {!src && text && <div>{text}</div>}
    </Box>
  );
}
