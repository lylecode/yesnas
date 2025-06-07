import { runCommand } from '../command';
import { DiskInfo, PartitionInfo, StorageUsage } from '../types/storage';

export const getDiskUsage = async (device: string): Promise<StorageUsage> => {
  const result = await runCommand(`df -h ${device}`);
  const json = JSON.parse(result.stdout);
  return {
    device: json[0].filesystem,
    size: json[0].size,
    used: json[0].used,
    available: json[0].available,
    usePercent: json[0].use_percent,
  };
};
export const getDiskInfo = async (): Promise<DiskInfo[] | null> => {
  const disksCmd = await runCommand(`lsblk -d -o name,type,fstype,mountpoint,serial,size,path,model,kname`);
  const disks = JSON.parse(disksCmd.stdout) as DiskInfo[];

  const disksWithPartitions = await Promise.all(
    disks
      .filter((d) => d.type !== 'loop')
      .map(async (disk) => {
        const partitionsCmd = await runCommand(`lsblk ${disk.path}`);
        disk.partitions = JSON.parse(partitionsCmd.stdout).filter((p: PartitionInfo) => p.type !== 'disk');
        const isSystem = disk?.partitions?.some((partition) => partition.mountpoints?.includes('/boot'));
        disk.type = isSystem ? 'sys' : disk.type === 'rom' ? 'rom' : 'data';
        disk.inUsed = disk?.partitions?.some((d) => d.mountpoints?.length);

        return disk;
      }),
  );

  disksWithPartitions.filter((d) => d.type === 'disk');
  return disksWithPartitions;
};
