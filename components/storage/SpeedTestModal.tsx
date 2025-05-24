import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import UIButton from "../ui/UIButton";
import ModalView from "../ui/UIModal";
interface Props {
  onClose?: () => void;
  isOpen?: boolean;
}

const SpeedTestModal = ({ isOpen = false, onClose }: Props) => {
  return (
    <ModalView isOpen={isOpen} onClose={onClose} title="测速" size="3xl">
      <div className="flex justify-end">
        <UIButton isLoading>开始测试</UIButton>
      </div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>磁盘标识</TableColumn>
          <TableColumn>容量</TableColumn>
          <TableColumn>速度</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1" className="border-b-1 border-gray-100">
            <TableCell>希捷 / MZVLB512HBJQ</TableCell>
            <TableCell>12 GB</TableCell>
            <TableCell className="flex flex-col gap-1">
              <span>读取：900.234 MB/s</span> <span>写入：11200 MB/s</span>
            </TableCell>
          </TableRow>
          <TableRow key="2" className="border-b-1 border-gray-100">
            <TableCell>希捷 / MZVLB512HBJQ</TableCell>
            <TableCell>12 GB</TableCell>
            <TableCell className="flex flex-col gap-1">
              <div className="flex justify-start">
                <Spinner size="sm" color="primary" variant="dots" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="3" className="border-b-1 border-gray-100">
            <TableCell>希捷 / MZVLB512HBJQ</TableCell>
            <TableCell>12 GB</TableCell>
            <TableCell className="flex flex-col gap-1">
              <div className="flex justify-start">
                <Spinner size="sm" color="primary" variant="dots" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ModalView>
  );
};

export default SpeedTestModal;
