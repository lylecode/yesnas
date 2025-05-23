import { cn } from "@/lib/utils";
import { Checkbox } from "@heroui/react";
import { BsDeviceHdd } from "react-icons/bs";
import Panel from "../ui/Panel";

interface Props {
  label: string;
  device: string;
  brand: string;
  serial: string;
  totalSize: string;
  temperature: string | number;
  usage: string;
  status: string;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  className?: string;
}

const DiskCard = ({
  label,
  device,
  brand,
  serial,
  totalSize,
  temperature,
  usage,
  status,
  checked,
  onCheck,
  className,
}: Props) => {
  return (
    <Panel className={cn("relative mb-3 flex flex-col", className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-b-gray-200 pb-3 text-sm">
          <div className="rounded bg-blue-400 px-2 py-1 text-xs text-white">
            {label}
          </div>
          <div className="flex gap-2">
            <span>{brand}</span> <span>/</span>
            <span>{serial}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <BsDeviceHdd className="flex flex-1 text-4xl" />
          <div className="h-f h-full w-[1px] bg-gray-200" />
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-neutral-500">Total</span>
            <span>{totalSize}</span>
          </div>
          <div className="h-f h-full w-[1px] bg-gray-200" />
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-neutral-500">温度</span>{" "}
            <span>{temperature}</span>
          </div>
          <div className="h-f h-full w-[1px] bg-gray-200" />
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-neutral-500">存储空间</span>{" "}
            <span>{usage}</span>
          </div>
          <div className="h-f h-full w-[1px] bg-gray-200" />
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-neutral-500">状态</span> <span>{status}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 cursor-pointer p-3 pr-4">
        <Checkbox
          value="2"
          radius="sm"
          size="md"
          classNames={{
            wrapper: "border-none",
          }}
          onChange={(e) => {
            onCheck && onCheck(e.target.checked);
          }}
        ></Checkbox>
      </div>
    </Panel>
  );
};

export default DiskCard;
