import { PendingDataContext, _util } from "@hydrophobefireman/kit";

import { Container } from "./container";
import { ContainerProps } from "./types";

export type ResourceContainerProps = ContainerProps & {
  isPending: boolean;
  resourceName: string;
};
export function Resource({
  isPending,
  resourceName,
  ...rest
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
      <Container {...rest} />
    </PendingDataContext.Provider>
  );
}
