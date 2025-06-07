'use client';
import Container from '@/components/layout/Container';
import DiskCard from '@/components/storage/DiskCard';
import SpeedTestModal from '@/components/storage/SpeedTestModal';
import StorageCard from '@/components/storage/StorageCard';
import UIButton from '@/components/ui/UIButton';
import UIEmptyData from '@/components/ui/UIEmptyData';
import { default as Panel, default as UIPanel } from '@/components/ui/UIPanel';
import UISpinner from '@/components/ui/UISpinner';
import api from '@/lib/ky';
import { StorageResponse } from '@/lib/types/response';
import { DiskInfo } from '@/lib/types/storage';
import { Tab, Tabs } from '@heroui/react';
import { useCallback, useEffect, useState } from 'react';
const StoragePage = () => {
  const [isOpenSpeedTestModal, setIsOpenSpeedTestModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [disks, setDisks] = useState<DiskInfo[]>([]);
  const [selectedKey, setSelectedKey] = useState('未使用');
  const [storageList, setStorageList] = useState<StorageResponse[] | null>(null);
  const [selectedDisks, setSelectedDisks] = useState<number[]>([]);

  const handleCheck = useCallback((selIndex: number, checked: boolean) => {
    setSelectedDisks((prev) => (checked ? [...new Set([...prev, selIndex])] : prev.filter((i) => i !== selIndex)));
  }, []);
  const handleSpeedTest = useCallback(() => {
    // 获取选中的磁盘信息
    const selectedDiskInfos = selectedDisks.filter((_, index) => selectedDisks.includes(index));
    console.log('选中的磁盘:', selectedDiskInfos);
    setIsOpenSpeedTestModal(true);
  }, [selectedDisks]);
  const handleCreateStorage = useCallback(() => {
    console.log('创建存储空间，选中的磁盘索引:', selectedDisks);
  }, [selectedDisks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storageResponse, disksResponse] = await Promise.all([
          api.get('/api/storage').json<StorageResponse[]>(),
          api.get('/api/storage/disk').json<DiskInfo[]>(),
        ]);

        setStorageList(storageResponse);
        setDisks(disksResponse);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = (tabKey: '未使用' | '已使用' | '全部') => {
    const filteredDisks = disks.filter((disk) => {
      switch (tabKey) {
        case '未使用':
          return !disk.inUsed;
        case '已使用':
          return disk.inUsed;
        case '全部':
          return true;
      }
    });

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredDisks.map((disk, index) => (
          <DiskCard
            key={`${disk.name}-${index}`}
            diskInfo={disk}
            className={selectedDisks.includes(index) ? 'border-blue-400 bg-blue-50 shadow-sm' : undefined}
            onCheck={(checked) => handleCheck(index, checked)}
          />
        ))}
      </div>
    );
  };

  const isDiskableSelected = selectedDisks.some((index) => {
    const disk = disks[index];
    return disk?.partitions?.some((partition) => partition.mountpoints?.includes('/boot'));
  });

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
              tabList: 'flex-nowrap m-0 p-0',
            }}>
            <Tab key="未使用" title="未使用" />
            <Tab key="已使用" title="已使用" />
            <Tab key="全部" title="全部" />
          </Tabs>

          <div className="h-10">
            {selectedKey !== '已使用' && (
              <div className="flex gap-3">
                <UIButton
                  variant="bordered"
                  radius="sm"
                  isDisabled={selectedDisks.length === 0 || isDiskableSelected}
                  color="default"
                  onPress={handleSpeedTest}>
                  测速
                </UIButton>
                <UIButton
                  isDisabled={selectedDisks.length === 0 || isDiskableSelected}
                  radius="sm"
                  onPress={handleCreateStorage}>
                  创建存储空间
                </UIButton>
              </div>
            )}
          </div>
        </div>
        {selectedKey === '未使用' && renderTabContent('未使用')}
        {selectedKey === '已使用' && renderTabContent('已使用')}
        {selectedKey === '全部' && renderTabContent('全部')}
      </Panel>
      <UIPanel title="存储空间" className="border-none">
        {isLoading ? <UISpinner /> : storageList?.length ? <StorageCard storageList={storageList} /> : <UIEmptyData />}
      </UIPanel>
      {/* SpeedTest */}
      <SpeedTestModal isOpen={isOpenSpeedTestModal} onClose={() => setIsOpenSpeedTestModal(false)} />
      {/* StorageInfo */}
    </Container>
  );
};

export default StoragePage;
