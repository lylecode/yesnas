import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import { useRef } from "react";
interface Props {
  title?: string;
  footerButtons?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}
const UIModalView = ({
  isOpen = false,
  title = "Modal Title",
  footerButtons,
  onClose,
  children,
  ...restProps
}: Props & ModalProps) => {
  const { onOpenChange } = useDisclosure();
  const targetRef = useRef<HTMLElement>(null!);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  return (
    <>
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={onClose}
        classNames={{
          closeButton: "cursor-pointer text-xl text-black mt-2 mr-3",
        }}
        {...restProps}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                {...moveProps}
                className="flex flex-col gap-1 border-b border-gray-100"
              >
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter> {footerButtons || "\u00A0"}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UIModalView;
