import { DOMElements } from "@hydrophobefireman/kit";
export interface TransitionProps {
  enterClass?: string;
  idleClass?: string;
  leaveClass?: string;
  render: (() => JSX.Element) | JSX.Element | null | undefined | false;
  visible: boolean;
  id: string | number | null;
  as?: DOMElements;
  transitionHook?(e: TransitionEvent, state: "DONE" | "CANCEL");
  transitionTargets?: Array<HTMLElement | SVGElement>;
}
export type RenderState = "INITIAL" | "IDLE" | "UNMOUNT";
export {};
