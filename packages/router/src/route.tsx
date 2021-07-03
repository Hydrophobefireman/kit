import { ComplexComponent } from "@hydrophobefireman/kit";
import { RouteComponentProps } from "./types";
import { useMemo } from "@hydrophobefireman/ui-lib";
import { useTransitionRouter } from "./hooks";

export function Route({ render }: RouteComponentProps) {
  const { pendingTransitionOut, path, params } = useTransitionRouter();
  const func = useMemo(
    () => (R: ComplexComponent) => <R params={params} />,
    [params]
  );
  return (
    <div
      kit-route={path}
      style={{
        transition: "var(--kit-transition)",
        opacity: pendingTransitionOut ? 0.5 : 1,
      }}
    >
      {func(render)}
    </div>
  );
}
