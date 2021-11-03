import {useEffect} from "@hydrophobefireman/ui-lib";

export function _useHideScrollbar(shouldHide: boolean) {
  return useEffect(() => {
    if (!shouldHide) return;
    const body = document.body;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previous;
    };
  }, [shouldHide]);
}
