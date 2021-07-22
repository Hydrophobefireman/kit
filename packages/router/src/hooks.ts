import { useContext, useRef } from "@hydrophobefireman/ui-lib";

import { Ctx } from "./router-context";

export function useTransitionRouter() {
  return useContext(Ctx);
}
