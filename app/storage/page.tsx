"use client";
import Container from "@/components/layout/Container";
import DiskCard from "@/components/storage/DiskCard";
import SpeedTestModal from "@/components/storage/SpeedTestModal";
import StorageInfoModal from "@/components/storage/StorageInfoModal";
import UIButton from "@/components/ui/UIButton";
import Panel from "@/components/ui/UIPanel";
import { UIProgressBar } from "@/components/ui/UIProgressBar";
import { Tab, Tabs, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { BsFillCassetteFill } from "react-icons/bs";
const StoragePage = () => {
  const [isOpenSpeedTestModal, setIsOpenSpeedTestModal] = useState(false);
  const [isOpenStorageInfoModal, setIsOpenStorageInfoModal] = useState(false);

  const [disks, setDisks] = useState([
    {
      label: "数据盘",
      device: "/dev/sdb",
      brand: "希捷",
      serial: "ST2000DM008",
      totalSize: "2 TB",
      temperature: 45,
      usage: "电影",
      status: "健康",
      checked: false,
    },
    {
      label: "系统盘",
      device: "/dev/sda",
      brand: "三星",
      serial: "MZVLB512HBJQ",
      totalSize: "512 GB",
      temperature: 52,
      usage: "系统",
      status: "健康",
      checked: false,
    },
    {
      label: "备份盘",
      device: "/dev/sdc",
      brand: "西数",
      serial: "WD40EZAZ",
      totalSize: "4 TB",
      temperature: 41,
      usage: "备份",
      status: "良好",
      checked: false,
    },
  ]);
  const [selectedKey, setSelectedKey] = useState("未使用");

  const handleCheck = (index: number, checked: boolean) => {
    const updatedDisks = [...disks];
    updatedDisks[index].checked = checked;
    setDisks(updatedDisks);
  };
  const selectedDisks = disks.filter((disk) => disk.checked);
  const isAnyDiskSelected = selectedDisks.length > 0;

  const handleSpeedTest = () => {
    console.log(
      "测速设备：",
      selectedDisks.map((d) => d.device),
      setIsOpenSpeedTestModal(true),
    );
  };

  const handleStorageInfo = () => {
    console.log(
      "测速设备：",
      selectedDisks.map((d) => d.device),
      setIsOpenStorageInfoModal(true),
    );
  };

  const handleCreateStorage = () => {
    console.log(
      "创建存储空间，所选设备：",
      selectedDisks.map((d) => d.device),
    );
  };
  const { onOpen } = useDisclosure();
  return (
    <Container title="存储空间">
      <Panel title="未使用的磁盘" className="flex flex-col gap-4 border-none">
        <div className="flex items-center justify-between">
          <Tabs
            variant="underlined"
            aria-label="Options"
            selectedKey={selectedKey}
            onSelectionChange={(key) => setSelectedKey(key as string)}
            classNames={{
              tabList: "flex-nowrap m-0 p-0",
            }}
          >
            <Tab key="未使用" title="未使用" />
            <Tab key="已使用" title="已使用" />
            <Tab key="全部" title="全部" />
          </Tabs>

          <div className="flex gap-3">
            <UIButton
              variant="bordered"
              radius="sm"
              isDisabled={!isAnyDiskSelected}
              color="default"
              onPress={handleSpeedTest}
            >
              测速
            </UIButton>
            <UIButton
              isDisabled={!isAnyDiskSelected}
              radius="sm"
              onPress={handleCreateStorage}
            >
              创建存储空间
            </UIButton>
          </div>
        </div>

        <div className="">
          {selectedKey === "未使用" && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {disks.map((disk, index) => (
                <DiskCard
                  key={index}
                  className={
                    disk.checked
                      ? "border-blue-400 bg-blue-50 shadow-sm"
                      : undefined
                  }
                  {...disk}
                  onCheck={(checked) => handleCheck(index, checked)}
                />
              ))}
            </div>
          )}

          {selectedKey === "已使用" && <div>已使用内容</div>}
          {selectedKey === "全部" && <div>全部内容</div>}
        </div>
      </Panel>

      <Panel title="存储空间" className="border-none">
        <div className="flex flex-row gap-3">
          <Panel className="flex w-60 text-sm">
            <div className="flex flex-row items-center justify-between">
              <span className="font-medium">电影</span>
              <UIButton onPress={handleStorageInfo} variant="flat">
                <BsFillCassetteFill className="text-lg" />
              </UIButton>
            </div>
            <div>
              <div className="mb-1 flex flex-row items-center justify-between text-xs">
                <span>5%</span>
                <span>23.22 GB / 239.00 GB</span>
              </div>
              <UIProgressBar />
            </div>
            <div className="text-blue-500">正常</div>
          </Panel>
        </div>
      </Panel>
      {/* SpeedTest */}
      <SpeedTestModal
        isOpen={isOpenSpeedTestModal}
        onClose={() => setIsOpenSpeedTestModal(false)}
      />
      <StorageInfoModal
        isOpen={isOpenStorageInfoModal}
        onClose={() => setIsOpenStorageInfoModal(false)}
      />
    </Container>
  );
};

export default StoragePage;
