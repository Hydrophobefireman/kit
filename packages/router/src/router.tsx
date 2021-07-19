import { ComplexComponent } from "@hydrophobefireman/kit";
import {
  Path,
  Router as UIRouter,
  h,
  useEffect,
  useRef,
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
        fallbackComponent={props.fallbackComponent}
        inMemoryRouter={props.inMemoryRouter}
      >
        {Object.keys(props.paths).map((x) => {
          const val = props.paths[x];
          return (
            <Path
              match={x}
              component={TransitionManager}
              child={val}
              path={x}
              transitionStyle={props.transitionStyle}
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
}: TransitionManagerProps) {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [childState, _setChildState] = useState<ComplexComponent>(null);
  const latestChildRef = useRef(child);
  latestChildRef.current = child;
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
      let preloader: Preloader = preload;
      let Fallback: ComplexComponent = fallback;

      preloader = preloader || (component as any)._preload;
      Fallback = Fallback || (component as any)._fallback;
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
