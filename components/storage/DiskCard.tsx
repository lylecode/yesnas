import { DiskInfo } from '@/lib/types/storage';
import { cn } from '@/lib/utils';
import { Checkbox } from '@heroui/react';
import { BsDeviceHdd, BsNvme } from 'react-icons/bs';
import Panel from '../ui/UIPanel';

interface Props {
  diskInfo: DiskInfo;
  status?: string;
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  className?: string;
}

const DiskCard = ({ diskInfo, status, checked, onCheck, className }: Props) => {
  const renderDiskIcon = () => {
    return diskInfo.path.startsWith('nvme') ? <BsNvme className="text-2xl" /> : <BsDeviceHdd className="text-2xl" />;
  };
  const DiskInfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-1 flex-col items-center gap-1">
      <span className="text-xs text-neutral-500">{label}</span>
      <span className="text-sm">{value || '-'}</span>
    </div>
  );

  return (
    <Panel className={cn('relative mb-3 flex flex-col overflow-hidden', className)}>
      <div className="absolute top-2 right-0 p-3 pr-4">
        <Checkbox
          isSelected={checked}
          radius="sm"
          isDisabled={diskInfo.inUsed}
          size="md"
          classNames={{
            wrapper: 'border-none',
          }}
          onChange={(e) => onCheck?.(e.target.checked)}
        />
      </div>

      <div className="flex items-center gap-2 border-b border-b-gray-200 pb-3 text-sm">
        <span
          className={cn(
            'rounded px-2 py-1 text-xs text-white',
            diskInfo.type === 'sys' ? 'bg-red-500' : 'bg-blue-400',
          )}>
          {diskInfo.type === 'sys' ? '系统盘' : '数据盘'}
        </span>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="truncate font-medium">{diskInfo.model}</span>
          <span className="text-gray-400">/</span>
          <span className="truncate text-gray-600">{diskInfo.serial}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 text-sm">
        <span className="flex flex-col rounded-full p-3">
          {renderDiskIcon()}
          {diskInfo.name}
        </span>

        <div className="h-full w-px bg-gray-200" />

        <DiskInfoItem label="总容量" value={diskInfo.size} />
        <div className="h-full w-px bg-gray-200" />

        <DiskInfoItem label="温度" value={diskInfo.temperature ? `${diskInfo.temperature}°C` : null} />
        <div className="h-full w-px bg-gray-200" />

        <DiskInfoItem label="存储空间" value="-" />
        <div className="h-full w-px bg-gray-200" />

        <DiskInfoItem
          label="状态"
          value={
            <span className={diskInfo.inUsed ? 'text-green-500' : 'text-gray-500'}>
              {diskInfo.inUsed ? '使用中' : '未使用'}
            </span>
          }
        />
      </div>
    </Panel>
  );
};

export default DiskCard;
