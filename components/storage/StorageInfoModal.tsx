import { Tab, Tabs } from "@heroui/react";
import UIModalView from "../ui/UIModal";

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
}
const StorageInfoModal = ({ isOpen = false, onClose }: Props) => {
  return (
    <UIModalView isOpen={isOpen} onClose={onClose} title="测速" size="2xl">
      <Tabs>
        <Tab>影音文件</Tab> <Tab>磁盘信息</Tab>
      </Tabs>
    </UIModalView>
  );
};

export default StorageInfoModal;
