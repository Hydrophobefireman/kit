import { ComplexComponent, _util } from "@hydrophobefireman/kit";
import { Spinner } from "@hydrophobefireman/kit/loading";
import { useLayoutEffect, useState } from "@hydrophobefireman/ui-lib";

import { DynamicComponentProps, Preloader } from "./types";

function RouteSpinner() {
  return <Spinner size="4rem" />;
}
export function dynamic(
  loader: Preloader,
  { fallback, errorFallback, unsafe }: DynamicComponentProps = {}
) {
  function Fallback({ error }: any) {
    return errorFallback ? errorFallback(error) : <div>An error occured</div>;
  }
  const F = fallback || RouteSpinner;
  const C = function Dynamic(props: any) {
    const [C, setComponent] = useState<ComplexComponent>(null);
    const [exception, setException] = useState<Error>(null);

    useLayoutEffect(() => {
      loader()
        .then((x) => {
          let $c: ComplexComponent;
          if ("default" in x) {
            $c = x.default;
          } else {
            $c = x;
          }
          setComponent(() => $c);
        })
        .catch((e) => {
          console.error(e);
          setException(e);
        });
    }, []);
    if (exception) return <Fallback error={exception} />;
    if (!C) return <F {...props} />;
    return <C />;
  };

  C._preload = unsafe ? null : loader;
  C._fallback = Fallback;
  C._loader = F;
  return C;
}

export function isLoadableRoute(x: any): x is ReturnType<typeof dynamic> {
  return typeof x === "function" && !!x._preload;
}
