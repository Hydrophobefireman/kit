import { DynamicComponentProps, Preloader } from "./types";
import { useLayoutEffect, useState } from "@hydrophobefireman/ui-lib";

import { ComplexComponent } from "@hydrophobefireman/kit";
import { Spinner } from "@hydrophobefireman/kit/loading";

export function dynamic(
  loader: Preloader,
  { fallback, errorFallback, unsafe }: DynamicComponentProps = {}
) {
  function Fallback({ error }: any) {
    return errorFallback ? errorFallback(error) : <div>An error occured</div>;
  }
  const F = fallback || Spinner;
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

  if (!unsafe) C._preload = loader;
  C._fallback = Fallback;
  C._loader = F;
  return C;
}

export function isLoadableRoute(x: any): x is ReturnType<typeof dynamic> {
  return typeof x === "function" && "_preload" in x;
}
