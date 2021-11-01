import { BaseElement } from "@hydrophobefireman/kit";
import { Box } from "@hydrophobefireman/kit/container";
import { Dropdown } from "@hydrophobefireman/kit/dropdown";
import { useRef, useState } from "@hydrophobefireman/ui-lib";

import { SelectProps } from "./types";

export function Select({ options }: BaseElement<SelectProps>) {
  const parentRef = useRef<HTMLElement>();
  const sibRef = useRef<HTMLElement>();
  const [visible, setVisible] = useState(false);
  return (
    <Box>
      <button></button>
      <Dropdown parent={parentRef} sibling={sibRef}></Dropdown>
    </Box>
  );
}
