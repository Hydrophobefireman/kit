import { useEffect, useState } from "@hydrophobefireman/ui-lib";

function preventDefault(e: Event) {
  e.preventDefault();
}

export function useFileDrop(
  el?: HTMLElement,
  options?: { multiple?: boolean }
): [File[] | null, (f: File[]) => void, () => void] {
  options = options || {};
  // el = el || document.documentElement;
  const [files, _setFiles] = useState<File[] | null>(null);

  useEffect(() => {
    if (!el) return;
    const setFiles: typeof _setFiles = function (f) {
      return _setFiles((old) => {
        const t = typeof f === "function" ? f(old) : f;
        return t ? (options!.multiple ? t : t[0]) : t;
      });
    };
    const onDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer!;
      if (dt.items) {
        const tf = Array.from(dt.items);
        setFiles(
          tf
            .map((i) => (i.kind === "file" ? i.getAsFile() : null))
            .filter(Boolean) as any
        );
      } else {
        setFiles(Array.from(dt.files));
      }
    };
    el!.addEventListener("drop", onDrop);
    el!.addEventListener("dragover", preventDefault);
    return () => {
      el!.removeEventListener("drop", onDrop);
      el!.removeEventListener("dragover", preventDefault);
    };
  }, [el, options.multiple]);
  return [
    files && files.length ? files : null,
    _setFiles,
    () => _setFiles(null),
  ];
}
