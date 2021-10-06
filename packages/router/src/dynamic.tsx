import { ComplexComponent, _util } from "@hydrophobefireman/kit";
import { h, useLayoutEffect, useState } from "@hydrophobefireman/ui-lib";

import { DynamicComponentProps, Preloader } from "./types";

export function dynamic(
  loader: Preloader,
  { fallback, errorFallback, unsafe }: DynamicComponentProps = {}
) {
  function Fallback({ error }: any) {
    return errorFallback ? errorFallback(error) : <div>An error occured</div>;
  }
  const F = fallback;
  const dynamicComponent = function Dynamic(props: any) {
    const [Component, setComponent] = useState<ComplexComponent | null>(null);
    const [exception, setException] = useState<Error | null>(null);

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
    if (!Component) return h(F, props as any);
    return <Component />;
  };

  dynamicComponent._preload = unsafe ? null : loader;
  dynamicComponent._fallback = Fallback;
  dynamicComponent._loader = F;
  return dynamicComponent;
}

export function isLoadableRoute(x: any): x is ReturnType<typeof dynamic> {
  return typeof x === "function" && !!x._preload;
}
