import {useEffect, useState} from "@hydrophobefireman/ui-lib";

import {useLatestRef} from "./use-latest-ref";

function preventDefault(e: Event) {
  e.preventDefault();
}
export function useFileDrop(
  el: HTMLElement | undefined,
  options: {
    multiple?: boolean;
  } = {multiple: false}
): [File[] | File | null, (f: File[]) => void, () => void] {
  options = options || {};
  // el = el || document.documentElement;
  const [files, _setFiles] = useState<File[] | File | null>(null);
  useEffect(() => {
    if (!el) return;
    const setFiles = function (f: any) {
      return _setFiles((old) => {
        const t = typeof f === "function" ? f(old) : f;
        return t ? (options.multiple ? t : t[0]) : t;
      });
    };
    const onDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer!;
      if (dt?.items) {
        const tf = Array.from(dt.items);
        setFiles(
          tf
            .map((i) => (i.kind === "file" ? i.getAsFile() : null))
            .filter(Boolean)
        );
      } else {
        setFiles(Array.from(dt.files));
      }
    };
    el.addEventListener("drop", onDrop);
    el.addEventListener("dragover", preventDefault);
    return () => {
      el.removeEventListener("drop", onDrop);
      el.removeEventListener("dragover", preventDefault);
    };
  }, [el, options.multiple]);
  return [files, _setFiles, () => _setFiles(null)];
}
export function useFileDropListener(
  el: HTMLElement | undefined,
  listener: (files: File[]) => void,
  options?: {
    multiple?: boolean;
  }
): void {
  const listenerRef = useLatestRef(listener);
  options = options || {};
  useEffect(() => {
    if (!el) return;
    // -----
    const onDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer;
      let fArr;
      if (dt?.items) {
        const tf = Array.from(dt.items);
        fArr = tf
          .map((i) => (i.kind === "file" ? i.getAsFile() : null))
          .filter(Boolean);
      } else {
        fArr = Array.from(dt?.files || []);
      }
      listenerRef.current?.(fArr);
    };
    // -----
    el.addEventListener("drop", onDrop);
    el.addEventListener("dragover", preventDefault);
    return () => {
      el.removeEventListener("drop", onDrop);
      el.removeEventListener("dragover", preventDefault);
    };
  }, [el, options.multiple]);
}
