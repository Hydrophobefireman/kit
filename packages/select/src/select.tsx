import {BaseElement} from "@hydrophobefireman/kit";
import {OptionsRenderer} from "@hydrophobefireman/kit/_autocomplete-options";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box} from "@hydrophobefireman/kit/container";
import {Dropdown} from "@hydrophobefireman/kit/dropdown";
import {useLabelId} from "@hydrophobefireman/kit/hooks";
import {Transition} from "@hydrophobefireman/kit/transition";
import {useRef, useState} from "@hydrophobefireman/ui-lib";

import {SelectProps} from "./types";

export function Select({
  options,
  id,
  value,
  label,
  setValue,
}: BaseElement<SelectProps>) {
  const parentRef = useRef<HTMLElement>();
  const sibRef = useRef<HTMLElement>();
  const [active, setActive] = useState(false);
  const [idx, labelId] = useLabelId(id);

  return (
    <Box>
      <label class={classnames.srOnly} id={labelId}>
        {label}
      </label>
      <button aria-label={label}></button>
      <Dropdown parent={parentRef} sibling={sibRef}>
        <Transition
          enterClass={classnames.autocompleteInactive}
          leaveClass={classnames.autocompleteInactive}
          class={classnames.autocompleteDropdown}
          id={active ? idx : ""}
          visible={active}
          render={
            active && (
              <OptionsRenderer
                labelledBy={labelId}
                options={options}
                currentValue={value as string}
                select={setActive as any}
              />
            )
          }
        />
      </Dropdown>
    </Box>
  );
}
