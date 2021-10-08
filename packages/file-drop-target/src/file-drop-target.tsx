import { _util } from "@hydrophobefireman/kit";
import * as classnames from "@hydrophobefireman/kit/classnames";
import { Container, ContainerProps } from "@hydrophobefireman/kit/container";
import {
  useFileDrop,
  useLatestRef,
  useRerender,
} from "@hydrophobefireman/kit/hooks";
import { PaperClipIcon } from "@hydrophobefireman/kit/icons";
import { Text } from "@hydrophobefireman/kit/text";
import { useEffect, useRef, useState } from "@hydrophobefireman/ui-lib";
export function FileDropTarget({
  message,
  children,
  style,
  class: cls,
  className,
  onUpdate,
  ...props
}: ContainerProps & {
  message?: string;
  onUpdate: (f: File[], reset: () => void) => void;
}) {
  const ref = useRef<HTMLDivElement>();
  const r = useRerender();
  useEffect(() => {
    r();
  }, [ref.current]);
  const [files, reset] = useFileDrop(ref.current);
  const [accepting, setAccepting] = useState(false);
  const isAccepting = () => setAccepting(true);
  const disableAccepting = () => setAccepting(false);
  const onUpdateRef = useLatestRef(onUpdate);

  useEffect(() => files && onUpdateRef.current(files, reset), [files]);
  return (
    <Container
      onDragOver={isAccepting}
      onDragEnd={disableAccepting}
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
    </Container>
  );
}
