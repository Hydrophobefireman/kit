import { h, useContext } from "@hydrophobefireman/ui-lib";

import { persist, show } from "./_impl";
import { AlertContext, AlertContextType } from "./alert.context";

export function useAlerts(): AlertContextType {
  return useContext(AlertContext);
}

export function AlertRoot({ children }: { children?: any }) {
  return h(
    AlertContext.Provider,
    { value: { show, persist } } as any,
    children
  );
}
