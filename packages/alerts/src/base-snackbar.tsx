import {_util} from "@hydrophobefireman/kit";
import {Button} from "@hydrophobefireman/kit/button";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box} from "@hydrophobefireman/kit/container";
import {FocusTrap} from "@hydrophobefireman/kit/focus-trap";
import {
  _useHideScrollbar,
  useFocus,
  useMount,
} from "@hydrophobefireman/kit/hooks";
import {Transition} from "@hydrophobefireman/kit/transition";
import {Fragment} from "@hydrophobefireman/ui-lib";

import {BaseSnackbarProps} from "./types";

const ALERT_ID = `kit-snackbar-${_util.random()}`;
const alertTypeToClassnameMap = new Map([
  ["error", classnames.snackbarError],
  ["success", classnames.snackbarSuccess],
]);

export function BaseSnackbar({
  x,
  isActive,
  i,
  pop,
  alertStack,
  remove,
}: BaseSnackbarProps) {
  const andClose = (fn: any, isCancelled?: boolean) => {
    if (!isActive) return;
    return (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
      fn && fn(e);
      if (isCancelled || !x.preventClose) pop(x);
    };
  };
  const {ref, restore} = useFocus();
  useMount(() => restore);
  _useHideScrollbar(!!x.mask);
  const C = x.mask ? FocusTrap : Fragment;
  return (
    <>
      {x.mask && <div class={classnames.mask} />}
      <Transition
        visible={!!isActive}
        id={isActive ? ALERT_ID + i : ""}
        role="alert"
        leaveClass={classnames.snackbarLeave}
        style={{
          bottom: `${Math.max(0, 15 * (alertStack.size - i))}px`,
        }}
        class={[
          classnames.moveUp,
          classnames.snackbarRoot,
          classnames.flex,
          alertTypeToClassnameMap.get(x.type || ""),
        ]}
        transitionHook={() => !isActive && remove(x)}
        render={
          isActive && (
            <C shouldTrap>
              <span>{x.content}</span>
              <Box horizontal="right" row vertical="center" flex={1}>
                {(x.onActionClick || x.actionText) && (
                  <Button
                    ref={ref}
                    class={classnames.snackbarButton}
                    variant="shadow"
                    onClick={andClose(x.onActionClick)}
                    label={
                      typeof x.actionText === "string" ? x.actionText : "okay"
                    }
                  >
                    {x.actionText || "okay"}
                  </Button>
                )}
                {(x.onCancelClick || x.cancelText) && (
                  <Button
                    onClick={andClose(x.onCancelClick, true)}
                    class={classnames.snackbarButton}
                    variant="shadow"
                    mode="secondary"
                    label={
                      typeof x.cancelText === "string" ? x.cancelText : "cancel"
                    }
                  >
                    {x.cancelText || "cancel"}
                  </Button>
                )}
              </Box>
            </C>
          )
        }
      />
    </>
  );
}
