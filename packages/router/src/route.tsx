import {_util} from "@hydrophobefireman/kit";
import {h} from "@hydrophobefireman/ui-lib";

import {useTransitionRouter} from "./hooks";
import {RouteComponentProps} from "./types";

export function Route({render}: RouteComponentProps) {
  const {pendingTransitionOut, path, params, transitionStyle} =
    useTransitionRouter();

  const css = {transition: "var(--kit-transition)"};
  if (pendingTransitionOut) {
    _util.extend(css, transitionStyle || {opacity: 0.5});
  }
  return (
    <div data-route kit-route style={css}>
      {h(render, {params})}
    </div>
  );
}
