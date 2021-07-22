import { PendingDataContext, _util } from "@hydrophobefireman/kit";

export type ResourceContainerProps = {
  isPending: boolean;
  resourceName: string;
  children?: any;
};
export function Resource({
  isPending,
  resourceName,
  children,
}: ResourceContainerProps) {
  _util.guardBoolean(
    isPending,
    "Only use resource context if you actually have data fetching needs down the tree, pass `isPending` to reflect that"
  );
  const ctx: any = {
    isPending,
    resourceName: _util.guardExists(resourceName, "Provide a resource name"),
  };
  return (
    <PendingDataContext.Provider value={ctx}>
      {children}
    </PendingDataContext.Provider>
  );
}
