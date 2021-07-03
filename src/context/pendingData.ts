import { createContext, useContext } from "@hydrophobefireman/ui-lib";

export const PendingDataContext = createContext({
  resourceName: null,
  isPending: false,
});

export function useIsPending() {
  return useContext(PendingDataContext);
}
