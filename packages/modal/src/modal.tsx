import { BaseElement, _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import {
  useFocus,
  useHideScrollbar,
  useId,
  useKeyPress,
  useSelfEvent,
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
  }, []);
  useHideScrollbar(active);
  const handleOusideClick = useSelfEvent<MouseEvent>(onClickOutside);
  useKeyPress("Escape", () => onClickOutside && onClickOutside(), {
    target: window,
  });
  return (
    <div class={classnames.mask} onClick={onClickOutside && handleOusideClick}>
      <div class={classnames.modal} ref={ref}>
        {children}
      </div>
    </div>
  );
}
export function Modal({
  active,
  children,
  onClickOutside,
  onAnimationComplete,
}: ModalProps) {
  const id = useId();
  const [target, setTarget] = useState<HTMLDivElement>(null as any);
  return (
    <Transition
      transitionTargets={[target]}
      id={active ? id : ""}
      transitionHook={onAnimationComplete}
      render={
        active ? (
          <ModalImpl
            onClickOutside={active && onClickOutside}
            active={active}
            children={children}
            _setDom={setTarget}
          />
        ) : null
      }
      leaveClass={classnames.modalLeave}
      enterClass={classnames._modalEnter}
    />
  );
}
function Actions({ children }: { children?: any }) {
  const actionContainer = useFocus<HTMLDivElement>();
  return (
    <div tabIndex={0} ref={actionContainer} class={classnames.modalActions}>
      {children}
    </div>
  );
}
function Action({ class: cls, className, ...props }: BaseElement<{}>) {
  const classProp = [cls, className, classnames.modalActionButton];
  return <button class={classProp} {...props} />;
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
Modal.Actions = Actions;
Modal.Title = Title;
Modal.Subtitle = Subtitle;
Modal.Action = Action;
Modal.Body = Body;
export { Actions, Title, Subtitle, Action, Body };
export { useToggleState as useModal };
