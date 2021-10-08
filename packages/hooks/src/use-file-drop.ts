import { useEffect, useState } from "@hydrophobefireman/ui-lib";

function preventDefault(e: Event) {
  e.preventDefault();
}

export function useFileDrop(el?: HTMLElement): [File[] | null, () => void] {
  // el = el || document.documentElement;
  const [files, setFiles] = useState<File[] | null>(null);
  useEffect(() => {
    if (!el) return;
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
  }, [el]);
  return [files && files.length ? files : null, () => setFiles(null)];
}
