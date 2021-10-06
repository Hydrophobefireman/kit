import { ComplexComponent } from "@hydrophobefireman/kit";
import { useLatestRef } from "@hydrophobefireman/kit/hooks";
import {
  Path,
  Router as UIRouter,
  h,
  useEffect,
  useState,
} from "@hydrophobefireman/ui-lib";

import { isLoadableRoute } from "./dynamic";
import { Route } from "./route";
import { RouterContext } from "./router-context";
import {
  Preloader,
  RouterProps,
  TransitionManagerProps,
  TransitionPath,
} from "./types";

export function Router(props: RouterProps) {
  return (
    <kit-router-root>
      <UIRouter
        paths={props.paths}
        fallbackComponent={props.NotFoundComponent}
        inMemoryRouter={props.inMemoryRouter}
      >
        {Object.keys(props.paths).map((x) => {
          let val = props.paths[x];
          if (!("component" in val || "jsx" in val)) {
            if (typeof val === "function") {
              val = { component: val };
            } else if (val.constructor === undefined) {
              val = { jsx: val };
            }
          }
          return (
            <Path
              match={x}
              component={TransitionManager}
              child={val}
              path={x}
              transitionStyle={props.transitionStyle}
              commonFallback={props.fallbackComponent}
            />
          );
        })}
      </UIRouter>
    </kit-router-root>
  );
}

function functionThatReturns<T>(x: T) {
  return () => x;
}

export function TransitionManager({
  child,
  path,
  params,
  transitionStyle,
  commonFallback,
}: TransitionManagerProps) {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [childState, _setChildState] = useState<ComplexComponent | null>(null);
  const latestChildRef = useLatestRef(child);
  const commonFallbackRef = useLatestRef(commonFallback);
  function endTransition() {
    setTransitionComplete(true);
  }

  function setChildState(x: any, next: TransitionPath) {
    // state is stale (user navigated somewhere else, skip)
    if (next !== latestChildRef.current) return;
    return _setChildState(functionThatReturns(x));
  }

  useEffect(() => {
    setTransitionComplete(false);
    const next = latestChildRef.current;
    if ("component" in next) {
      const { component, preload, fallback } = next;
      let preloader: Preloader = preload!;
      let Fallback: ComplexComponent = fallback!;

      preloader = preloader || (component as any)._preload;
      Fallback =
        Fallback || (component as any)._fallback || commonFallbackRef.current;
      if (preloader) {
        preloader()
          .then((res) => {
            const Component = "default" in res ? res.default : res;
            setChildState(Component, next);
            endTransition();
          })
          .catch((e) => {
            setChildState(() => <Fallback error={e} />, next);
            endTransition();
          });
      } else {
        const X = component;
        setChildState(X, next);
        endTransition();
      }
    } else {
      setChildState(() => next.jsx, next);
      endTransition();
    }
  }, [path]);
  return (
    <RouterContext
      transitionStyle={transitionStyle}
      params={params}
      path={path}
      searchParams={UIRouter.searchParams}
      pendingTransitionOut={!transitionComplete}
    >
      {childState ? (
        <Route render={childState} />
      ) : (
        child &&
        h(
          child.loading ||
            ("component" in child &&
              isLoadableRoute(child.component) &&
              child.component._loader)
        )
      )}
    </RouterContext>
  );
}
