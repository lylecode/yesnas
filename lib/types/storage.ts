import { Storage } from '@prisma/client';

type DiskStatus = 'healthy' | 'faulty' | 'spare' | 'removed' | 'rebuilding';

interface RaidDisk {
  name: string;
  status: DiskStatus;
  slot?: number;
}
type RaidStatus = 'active' | 'inactive' | 'degraded' | 'resyncing' | 'recovering';
type RaidLevel = 0 | 1 | 5 | 6 | 10;

interface StorageDevice {
  device: string;
  uuid: string;
  status: RaidStatus;
  raidLevel: RaidLevel;
  disks: RaidDisk[];
  size: number;
  usedSize?: number;
  rebuildProgress?: number;
}

interface StorageSummary {
  raidArrays: StorageDevice[];
  unusedDisks: string[];
}

export interface DiskInfo {
  name: string;
  type: 'disk' | 'loop' | 'rom' | 'data' | 'sys';
  serial: string | null;
  size: string;
  path: string;
  temperature: string;
  model: string | null;
  kname: string;
  fstype: string | null;
  inUsed: boolean;
  mountpoint: string | null;
  partitions: PartitionInfo[];
}
export interface PartitionInfo {
  name: string;
  size: string;
  type: string;
  mountpoints: string | null;
}
export interface RaidInfo {
  device: string;
  creationTime: Date;
  updateTime: Date;
  raidLevel: 'raid0' | 'raid1' | 'raid5' | 'raid6' | 'raid10';
  arraySize: number;
  usedDevSize: number;
  state: 'clean' | 'degraded' | 'active' | 'inactive' | 'recovering';
  activeDevices: number;
  workingDevices: number;
  failedDevices: number;
  spareDevices: number;
  uuid: string;
  deviceTable: DeviceTable[];
  usage: StorageUsage;
}
export interface DeviceTable {
  number: number;
  major: string;
  minor: string;
  active: string;
  sync: string;
  device: string;
  raidDevice: number;
}
export interface StorageEntity {
  device: string;
  diskInfo: DiskInfo;
  raidInfo: RaidInfo;
  storage?: Storage;
}
export interface StorageUsage {
  device: string;
  size: number;
  used: number;
  available: number;
  usePercent: number;
}
