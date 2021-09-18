import { DOMElements } from "@hydrophobefireman/kit";
export interface TransitionProps {
  enterClass?: string;
  idleClass?: string;
  leaveClass?: string;
  render: (() => JSX.Element) | JSX.Element | null | false;
  id: string | number;
  as?: DOMElements;
  transitionHook?(e: TransitionEvent, state: "DONE" | "CANCEL");
}
export type RenderState = "INITIAL" | "IDLE" | "UNMOUNT";
export {};
