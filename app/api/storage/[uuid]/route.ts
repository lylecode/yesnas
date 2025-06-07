import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: any) => {
  const { uuid } = await context.params;
  const storage = await prisma.storage.findFirst({ where: { uuid } });
  return NextResponse.json(storage ?? { error: '未找到存储' }, { status: storage ? 200 : 404 });
};
