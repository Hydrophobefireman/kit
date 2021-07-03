import { TransitionRouterContext } from "./types";
import { createContext } from "@hydrophobefireman/ui-lib";

export const Ctx = createContext<TransitionRouterContext>({
  params: {},
  path: null,
  pendingTransitionOut: false,
  searchParams: null,
});
export function RouterContext(
  props: TransitionRouterContext & { children?: any }
) {
  const { children, ...rest } = props;
  return <Ctx.Provider value={rest as any} children={children} />;
}
