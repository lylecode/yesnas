import { StorageResponse } from '@/lib/types/response';
import { bytesFormat } from '@/lib/utils';
import { useState } from 'react';
import { BsHddRack } from 'react-icons/bs';
import { IoIosMore } from 'react-icons/io';
import UIPanel from '../ui/UIPanel';
import { UIProgressBar } from '../ui/UIProgressBar';
import StorageInfoModal from './StorageInfoModal';

interface Props {
  storageList: StorageResponse[];
}
const StorageCard = ({ storageList }: Props) => {
  const [isOpenStorageInfoModal, setIsOpenStorageInfoModal] = useState(false);
  const [select, setSelect] = useState<StorageResponse>();

  return (
    <div className="flex h-full flex-row flex-wrap gap-3">
      {storageList.map((storage, index) => (
        <UIPanel key={index} className="flex w-72 text-sm">
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="rounded-full bg-gray-100 p-3 text-4xl">
              <BsHddRack className="flex flex-1 text-2xl" />
            </span>

            <div className="flex w-full flex-col gap-1 text-xs">
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-medium">
                  {storage.storage?.name}
                  <span className="ml-2 rounded bg-green-100 px-2 py-1 text-xs text-green-400">正常</span>
                </div>
                <div>
                  <IoIosMore
                    className="cursor-pointer text-xl"
                    onClick={() => {
                      setSelect(storage);
                      setIsOpenStorageInfoModal(true);
                    }}
                  />
                </div>
              </div>
              <div className="text-neutral-500">{storage.storage?.type}</div>
            </div>
          </div>
          <div>
            <div className="mb-1 flex flex-row items-center justify-between text-xs">
              <span>{storage.usage.usePercent}%</span>
              <span>
                {bytesFormat(storage.usage.available)} / {bytesFormat(storage.usage.size)}
              </span>
            </div>
            <UIProgressBar value={storage.usage.usePercent} />
          </div>
        </UIPanel>
      ))}

      <StorageInfoModal
        storageResponse={select}
        isOpen={isOpenStorageInfoModal}
        onClose={() => setIsOpenStorageInfoModal(false)}
      />
    </div>
  );
};

export default StorageCard;
