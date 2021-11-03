import {_util} from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import {Box, ContainerProps} from "@hydrophobefireman/kit/container";
import {useFileDrop, useLatestRef} from "@hydrophobefireman/kit/hooks";
import {PaperClipIcon} from "@hydrophobefireman/kit/icons";
import {Text} from "@hydrophobefireman/kit/text";
import {useEffect, useRef, useState} from "@hydrophobefireman/ui-lib";
export function FileDropTarget({
  message,
  children,
  style,
  class: cls,
  className,
  onUpdate,
  multiple,
  ...props
}: ContainerProps & {
  message?: string;
  onUpdate: (f: File[], reset: () => void) => void;
  multiple?: boolean;
}) {
  const ref = useRef<HTMLDivElement>();
  const [files, setFiles, reset] = useFileDrop(ref.current, {multiple});
  const [accepting, setAccepting] = useState(false);
  const isAccepting = () => setAccepting(true);
  const disableAccepting = () => setAccepting(false);
  const onUpdateRef = useLatestRef(onUpdate);

  useEffect(() => files && onUpdateRef.current(files, reset), [files]);
  return (
    <Box
      ref={ref}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = !!multiple;
        function listener() {
          if (input.files) {
            setFiles(Array.from(input.files));
          }
          input.removeEventListener("change", listener);
        }
        input.addEventListener("change", listener);
        input.click();
      }}
      onDragOver={isAccepting}
      onDragEnd={disableAccepting}
      onDragLeave={disableAccepting}
      onDrop={disableAccepting}
      horizontal="center"
      vertical="center"
      class={[
        className,
        cls,
        classnames.fileDropTarget,
        accepting && classnames.fileDropTargetAccepting,
      ]}
      {...props}
    >
      <PaperClipIcon />
      <Text>{message || "Drag and drop files here"}</Text>
      {children}
    </Box>
  );
}
