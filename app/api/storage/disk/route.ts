import { getDiskInfo } from '@/lib/commands/disk';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const disks = await getDiskInfo();

  return NextResponse.json(disks ?? { error: 'Data not found' }, { status: disks ? 200 : 404 });
};
