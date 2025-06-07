import api from '@/lib/ky';
import { StorageResponse } from '@/lib/types/response';
import { DeviceTable, DiskInfo, RaidInfo } from '@/lib/types/storage';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { JSX, useEffect, useMemo, useState } from 'react';
import { BsDeviceHdd, BsNvme } from 'react-icons/bs';
import UIModalView from '../ui/UIModal';

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  storageResponse?: StorageResponse;
}
const StorageInfoModal = ({ storageResponse, isOpen = false, onClose }: Props) => {
  const t = useTranslations('Global');
  const ts = useTranslations('Storage');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [raidInfo, setRaidInfo] = useState<RaidInfo | null>(null);
  const [diskInfo, setDiskInfo] = useState<DiskInfo[] | null>(null);

  const diskInfoMap = useMemo(() => {
    if (!diskInfo) return new Map<string, DiskInfo>();
    return new Map(diskInfo.map((disk) => [disk.path, disk]));
  }, [diskInfo]);

  useEffect(() => {
    if (!isOpen) {
      setRaidInfo(null);
      setDiskInfo(null);
      setIsLoading(true);
      return;
    }
    if (!storageResponse?.storage?.device) {
      setIsLoading(false);
      return;
    }
    const encodedDevice = encodeURIComponent(storageResponse.storage.device);

    const fetchData = async () => {
      try {
        const [raidData, diskData] = await Promise.all([
          api.get(`/api/storage/raid/${encodedDevice}`).json<RaidInfo>(),
          api.get(`/api/storage/disk`).json<DiskInfo[]>(),
        ]);

        setRaidInfo(raidData);
        setDiskInfo(diskData);
      } catch (error) {
        console.error('Failed to fetch storage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen, storageResponse?.storage?.device]);

  const renderDiskIcon = (diskName: string) => {
    return diskName.startsWith('nvme') ? (
      <BsNvme className="flex flex-1 text-2xl" />
    ) : (
      <BsDeviceHdd className="flex flex-1 text-2xl" />
    );
  };
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow className="animate-pulse">
          <TableCell>
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          </TableCell>
        </TableRow>
      );
    }

    if (!raidInfo?.deviceTable?.length) {
      return (
        <TableRow>
          <TableCell colSpan={4}>{t('emptyData')}</TableCell>
        </TableRow>
      );
    }

    return raidInfo.deviceTable
      .map((dt: DeviceTable, index) => {
        const currentDisk = diskInfoMap.get(dt.device);
        if (!currentDisk) return null;

        return (
          <TableRow key={index} className="border-b-1 border-gray-100">
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 p-3 text-4xl">{renderDiskIcon(currentDisk.name)}</span>
                <div className="flex flex-col gap-2">
                  <span>{currentDisk.model}</span>
                  <span className="text-xs text-neutral-500">SN:{currentDisk.serial}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{currentDisk.size}</TableCell>
            <TableCell>{ts(dt.sync)}</TableCell>
            <TableCell>{currentDisk.kname}</TableCell>
          </TableRow>
        );
      })
      .filter((row): row is JSX.Element => row !== null);
  };
  return (
    <UIModalView isOpen={isOpen} onClose={onClose} title={storageResponse?.storage?.name} size="2xl">
      <Table removeWrapper aria-label="Storage detail">
        <TableHeader>
          <TableColumn className="text-sm">磁盘标识</TableColumn>
          <TableColumn className="text-sm">容量</TableColumn>
          <TableColumn className="text-sm">状态</TableColumn>
          <TableColumn className="text-sm">速度</TableColumn>
        </TableHeader>
        <TableBody>{renderTableContent()}</TableBody>
      </Table>
    </UIModalView>
  );
};

export default StorageInfoModal;
