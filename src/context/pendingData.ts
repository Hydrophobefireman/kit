import {createContext, useContext} from "@hydrophobefireman/ui-lib";

export const PendingDataContext = createContext({
  resourceName: null,
  isPending: false,
});

export function useIsPending() {
  return useContext(PendingDataContext) as any as {
    resourceName: string;
    isPending: boolean;
  };
}
