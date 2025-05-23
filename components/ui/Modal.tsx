import {
  Button,
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
const ModalView = ({
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
          closeButton: "cursor-pointer",
        }}
        {...restProps}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                {footerButtons || (
                  <>
                    <Button color="danger" variant="light" onPress={onClose}>
                      关闭
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalView;
