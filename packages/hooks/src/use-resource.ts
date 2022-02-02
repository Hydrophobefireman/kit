import {State, useSharedState} from "statedrive";

import {_util} from "@hydrophobefireman/kit";
import {useEffect, useState} from "@hydrophobefireman/ui-lib";

export interface AbortableFetchResponse<T> {
  result: Promise<{data: T; error?: string}>;
  controller: AbortController;
  headers: Promise<Headers>;
}

export type FetchResourceCallback<T extends boolean> = (
  v?: T
) => T extends true ? Promise<void> : void;

function buildUseResource(cache: boolean) {
  return function useResource<
    T extends (...args: any) => AbortableFetchResponse<any>,
    R extends boolean = true
  >(
    func: T,
    args: Parameters<T>,
    cachingStore?: State<any>,
    requiredDeps?: Partial<typeof args>
  ) {
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

    const dep: Array<any> = args || [];
    function fetchResource(returnPromise?: R) {
      const r: Array<any> = requiredDeps as any;
      // don't fetch unless all required deps are truthy
      if (r && !r.every((x) => x !== null)) return;

      if (resp && !cache) setResp(null);
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
    useEffect(fetchResource, dep);
    return {resp, fetchResource, error, setResp, clearError};
  };
}

export const useResource = /* #__PURE__ */ buildUseResource(false);
export const useCachingResource = /* #__PURE__ */ buildUseResource(true);

export {buildUseResource};
