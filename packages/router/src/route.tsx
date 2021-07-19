import { ComplexComponent } from "@hydrophobefireman/kit";
import { useCallback } from "@hydrophobefireman/ui-lib";

import { useTransitionRouter } from "./hooks";
import { RouteComponentProps } from "./types";

export function Route({ render }: RouteComponentProps) {
  const { pendingTransitionOut, path, params, transitionStyle } =
    useTransitionRouter();
  const func = useCallback(
    (R: ComplexComponent) => <R params={params} />,
    [params]
  );
  const css = { transition: "var(--kit-transition)" };
  if (pendingTransitionOut) {
    Object.assign(css, transitionStyle || { opacity: 0.5 });
  }
  return (
    <kit-route data-kit-route={path} style={css}>
      {func(render)}
    </kit-route>
  );
}
