import {State, useSharedState} from "statedrive";

import {_util, useIsPending} from "@hydrophobefireman/kit";
import {useEffect, useState} from "@hydrophobefireman/ui-lib";

export interface AbortableFetchResponse<T> {
  result: Promise<{data: T; error?: string}>;
  controller: AbortController;
  headers: Promise<Headers>;
}

export type FetchResourceCallback<T extends boolean> = (
  v?: T
) => T extends true ? Promise<void> : void;

function buildUseResource(independant: boolean, cache: boolean) {
  return function useResource<
    T extends (...args: any) => AbortableFetchResponse<any>,
    R extends boolean = true
  >(func: T, args: Parameters<T>, cachingStore?: State<any>) {
    type Ret = Awaited<ReturnType<T>["result"]>["data"];
    const [resp, setResp]: [Ret, (k: Ret) => void] = cache
      ? useSharedState<Ret>(
          _util.guardExists(cachingStore, "Need to provide a caching store")!
        )
      : useState<Ret>(null);
    const [error, setError] = useState<any>("");
    function clearError() {
      setError(null);
    }

    const {isPending} = useIsPending();
    const _dep: Array<any> = args || [];
    const dependencies = independant ? _dep : _dep.concat(isPending);

    function fetchResource(returnPromise?: R) {
      const shouldWait = isPending && !independant;
      if (shouldWait) return;

      if (resp) setResp(null);
      const {controller, result} = func(...(args as any));
      const prom = result.then((x) => {
        const {data, error} = x;
        if (error) {
          setResp(null);
          return setError(error);
        }
        setError(null);
        setResp(data);
      });
      return (returnPromise ? prom : () => controller.abort()) as ReturnType<
        FetchResourceCallback<R>
      >;
    }
    useEffect(fetchResource, dependencies);
    return {resp, fetchResource, error, setResp, clearError};
  };
}

export const useResource = /* #__PURE__ */ buildUseResource(false, false);
export const useCachingResource = /* #__PURE__ */ buildUseResource(false, true);
export const useIndependantResource = /* #__PURE__ */ buildUseResource(
  true,
  false
);
export const useCachingIndependantResource = /* #__PURE__ */ buildUseResource(
  true,
  true
);

export {buildUseResource};
