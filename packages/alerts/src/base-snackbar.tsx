import { Button } from "@hydrophobefireman/kit/button";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { useHideScrollbar } from "@hydrophobefireman/kit/hooks";
import { Transition } from "@hydrophobefireman/kit/transition";

import { ALERT_ID } from "./constants";
import { BaseSnackbarProps } from ".";

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
    return () => {
      fn && fn();
      if (isCancelled || !x.preventClose) pop(x);
    };
  };
  useHideScrollbar(!!x.mask);
  return (
    <>
      {x.mask && <div class={classnames.mask} />}
      <Transition
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
          isActive ? (
            <>
              <span>{x.content}</span>
              <Container horizontal="right" row vertical="center" flex={1}>
                {(x.onActionClick || x.actionText) && (
                  <Button
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
              </Container>
            </>
          ) : null
        }
      />
    </>
  );
}
