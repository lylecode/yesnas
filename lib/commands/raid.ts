import { runCommand } from '../command';
import { DeviceTable, DiskInfo, RaidInfo, StorageEntity } from '../types/storage';
import { getDiskUsage } from './disk';

// 类型定义
type RaidLevel = 0 | 1 | 5 | 6 | 10;
type RaidState = 'active' | 'inactive' | 'degraded' | 'resyncing';

interface RaidDevice {
  path: string;
  status: 'healthy' | 'faulty';
}

interface RaidStatus {
  level: RaidLevel;
  state: RaidState;
  devices: RaidDevice[];
  size: string;
  rebuildProgress?: number;
}

// 获取 RAID 状态
export const getRaidStatus = async (): Promise<RaidStatus> => {
  const result = await runCommand('mdadm --detail /dev/md0 --json');

  if (!result.success) {
    throw new Error(`获取 RAID 状态失败: ${result.stderr}`);
  }

  try {
    const detail = JSON.parse(result.stdout);
    return {
      level: validateRaidLevel(detail.level),
      state: validateRaidState(detail.state),
      devices: parseDevices(detail.devices),
      size: detail.size,
      rebuildProgress: detail.rebuildProgress,
    };
  } catch (error) {
    throw new Error(`解析 RAID 状态失败: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// 创建 RAID 阵列
export const createRaid = async (
  devices: string[],
  level: RaidLevel,
  options?: { name?: string; chunkSize?: number },
): Promise<void> => {
  validateDevices(devices);

  const raidName = options?.name || '/dev/md0';
  const chunkOption = options?.chunkSize ? `--chunk=${options.chunkSize}` : '';

  const cmd = `mdadm --create ${raidName} --level=${level} \
    --raid-devices=${devices.length} ${chunkOption} ${devices.join(' ')}`;

  const result = await runCommand(cmd);

  if (!result.success) {
    throw new Error(`创建 RAID 失败: ${result.stderr}`);
  }
};

export const getRaids = async (): Promise<StorageEntity[]> => {
  const result = await runCommand('cat /proc/mdstat');
  const mdstat = JSON.parse(result.stdout);
  return await Promise.all(
    Object.keys(mdstat)
      .filter((key) => key.startsWith('md'))
      .map(async (key) => {
        const device = `/dev/${key}`;
        const [df, rf] = await Promise.all([getDiskInfo(device), getRaidDetail(device)]);
        return { device, diskInfo: df, raidInfo: rf };
      }),
  );
};

export const getRaidDetail = async (block: string): Promise<RaidInfo> => {
  const result = await runCommand(`mdadm --detail ${block}`);
  const json = JSON.parse(result.stdout);

  const deviceTable: DeviceTable[] = json.device_table.map((t: any) => ({
    number: t.number,
    major: t.major,
    minor: t.minor,
    active: t.state[0],
    sync: t.state[1],
    device: t.device,
    raidDevice: t.raid_device,
  }));
  const usage = await getDiskUsage(json.device);
  return {
    device: json.device,
    creationTime: new Date(json.creation_time_epoch * 1000),
    updateTime: new Date(json.update_time_epoch * 1000),
    raidLevel: json.raid_level,
    arraySize: json.array_size_num,
    usedDevSize: json.used_dev_size_num,
    state: json.state,
    activeDevices: json.active_devices,
    workingDevices: json.working_devices,
    failedDevices: json.failed_devices,
    spareDevices: json.spare_devices,
    uuid: json.uuid,
    deviceTable,
    usage,
  };
};

export const getDiskInfo = async (device: string): Promise<DiskInfo> => {
  const result = await runCommand(`df -h ${device}`);
  const json = JSON.parse(result.stdout);
  return {
    device: json[0].filesystem,
    size: json[0].size,
    used: json[0].used,
    available: json[0].available,
    usePercent: json[0].use_percent,
    mountedOn: json[0].mounted_on,
    state: 'active',
  };
};
// 停止 RAID 阵列
export const stopRaid = async (raidDevice: string = '/dev/md0'): Promise<void> => {
  const result = await runCommand(`mdadm --stop ${raidDevice}`);

  if (!result.success) {
    throw new Error(`停止 RAID 失败: ${result.stderr}`);
  }
};

// ============= 工具函数 =============
const validateRaidLevel = (level: unknown): RaidLevel => {
  if ([0, 1, 5, 6, 10].includes(level as number)) {
    return level as RaidLevel;
  }
  throw new Error(`无效的 RAID 级别: ${level}`);
};

const validateRaidState = (state: unknown): RaidState => {
  const states: RaidState[] = ['active', 'inactive', 'degraded', 'resyncing'];
  const normalized = String(state).toLowerCase();
  if (states.includes(normalized as RaidState)) {
    return normalized as RaidState;
  }
  return 'degraded'; // 默认返回 degraded
};

const parseDevices = (devices: any[]): RaidDevice[] => {
  return devices.map((device) => ({
    path: device.device,
    status: device.state === 'faulty' ? 'faulty' : 'healthy',
  }));
};

const validateDevices = (devices: string[]): void => {
  if (!devices.length) {
    throw new Error('至少需要提供一个设备');
  }

  const invalidDevices = devices.filter((d) => !d.startsWith('/dev/'));
  if (invalidDevices.length) {
    throw new Error(`无效的设备路径: ${invalidDevices.join(', ')}`);
  }
};
/**
 * export async function GET() {
  try {
    const result = await getDiskInfo();
    if (!result.success) {
      return NextResponse.json(
        { error: result.stderr },
        { status: 500 }
      );
    }
    return NextResponse.json(JSON.parse(result.stdout));
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
 */
