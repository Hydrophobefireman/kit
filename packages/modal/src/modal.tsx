import { BaseElement, _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container } from "@hydrophobefireman/kit/container";
import {
  useHideScrollbar,
  useId,
  useToggleState,
} from "@hydrophobefireman/kit/hooks";
import { Text, TextProps } from "@hydrophobefireman/kit/text";
import { Transition } from "@hydrophobefireman/kit/transition";
import { h } from "@hydrophobefireman/ui-lib";

import { ModalProps } from "./types";

function ModalImpl({ active, children }: ModalProps) {
  useHideScrollbar(active);
  return children;
}
export function Modal({ active, children }: ModalProps) {
  const id = useId();
  return (
    <>
      {active && <div class={classnames.mask}></div>}
      <div class={active ? classnames.modalContainer : ""}>
        <Transition
          id={active ? id : ""}
          render={
            active ? <ModalImpl active={active} children={children} /> : null
          }
          class={classnames.modal}
        />
      </div>
    </>
  );
}
function Actions({ children }: { children?: any }) {
  return <div class={classnames.modalActions}>{children}</div>;
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
