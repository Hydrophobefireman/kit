import { BaseElement, _util } from "@hydrophobefireman/kit";
import { buildPortal } from "@hydrophobefireman/kit/build-portal";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import { FocusTrap } from "@hydrophobefireman/kit/focus-trap";
import {
  _useHideScrollbar,
  _useSelfEvent,
  useId,
  useKeyPress,
  useMount,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import { Text, TextProps } from "@hydrophobefireman/kit/text";
import { Transition } from "@hydrophobefireman/kit/transition";
import { h, useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";

import { ModalProps } from "./types";

function ModalImpl({
  active,
  children,
  _setDom: setDom,
  onClickOutside,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    setDom && setDom(ref.current);
  }, [ref.current]);
  _useHideScrollbar(active);
  const handleOusideClick = _useSelfEvent<MouseEvent>(onClickOutside);
  useKeyPress("Escape", () => onClickOutside && onClickOutside(), {
    target: window,
  });

  return (
    <div class={classnames.mask} onClick={onClickOutside && handleOusideClick}>
      <div class={classnames.modal} ref={ref}>
        <FocusTrap shouldTrap={active}>{children}</FocusTrap>
      </div>
    </div>
  );
}
function _Modal({
  active,
  children,
  onClickOutside,
  onAnimationComplete,
}: ModalProps) {
  const id = useId();
  const [target, setTarget] = useState<HTMLDivElement>(null as any);

  return (
    <Transition
      visible={active}
      transitionTargets={[target]}
      id={active ? id : ""}
      transitionHook={onAnimationComplete}
      render={
        active && (
          <ModalImpl
            onClickOutside={active ? onClickOutside : (null as any)}
            active={active}
            children={children}
            _setDom={setTarget}
          />
        )
      }
      leaveClass={classnames.modalLeave}
      enterClass={classnames._modalEnter}
    />
  );
}
function Actions({ children }: { children?: any }) {
  return <div class={classnames.modalActions}>{children}</div>;
}
function Action({ class: cls, className, ...props }: BaseElement<{}>) {
  const classProp = [cls, className, classnames.modalActionButton];
  const ref = useRef<HTMLButtonElement>();
  useMount(() => {
    const { current } = ref;
    if (
      current === (current.parentNode && current.parentNode.firstElementChild)
    )
      current.focus();
  });
  return <button class={classProp} {...props} ref={ref} />;
}
function Title({
  class: cls,
  className,
  ...props
}: BaseElement<Omit<TextProps, "as" | "noMargin">>) {
  const klass = [classnames.modalHead, cls, className];
  return h(
    Text,
    _util.extend({ as: "h2", noMargin: true, class: klass }, props) as any
  );
}
function Subtitle({
  class: cls,
  className,
  ...props
}: BaseElement<Omit<TextProps, "as" | "noMargin">>) {
  const klass = [
    classnames.modalHead,
    classnames.modalSubtitle,
    cls,
    className,
  ];
  return h(
    Text,
    _util.extend({ as: "p", noMargin: true, class: klass }, props) as any
  );
}
function Body({ children }: { children?: any }) {
  return (
    <Container horizontal="center" style={{ padding: "2rem" }}>
      {children}
    </Container>
  );
}
const ModalComponent = buildPortal<ModalProps, typeof _Modal>("Modal", _Modal);
export const Modal: typeof ModalComponent & {
  Actions: typeof Actions;
  Title: typeof Title;
  Subtitle: typeof Subtitle;
  Action: typeof Action;
  Body: typeof Body;
} = ModalComponent as any;
Modal.Actions = Actions;
Modal.Title = Title;
Modal.Subtitle = Subtitle;
Modal.Action = Action;
Modal.Body = Body;
export { Actions, Title, Subtitle, Action, Body };
export { useToggleState as useModal };
