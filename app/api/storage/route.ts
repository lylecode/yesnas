import { getDiskUsage } from '@/lib/commands/disk';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  // getDiskInfo();
  //const raids = await getRaids();
  // const result = await Promise.all(
  //   raids.map(async (raids) => {
  //     const device = raids.device;
  //     const storage = await prisma.storage.findFirst({ where: { device } });
  //     return { device: device, diskInfo: raids.diskInfo, raidInfo: raids.raidInfo, storage };
  //   }),
  // );

  const storageList = await prisma.storage.findMany();
  const result = await Promise.all(
    storageList.map(async (storage) => {
      const usage = await getDiskUsage(storage.device);
      return { usage, storage };
    }),
  );

  return NextResponse.json(result ?? { error: '未找到存储' }, { status: result ? 200 : 404 });
};
