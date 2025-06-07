import { getRaidDetail } from '@/lib/commands/raid';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, context: any) => {
  const t = await getTranslations('Global');
  const { device } = await context.params;
  const deDevice = decodeURIComponent(device);
  const raid = await getRaidDetail(deDevice);

  return NextResponse.json(raid ?? { error: t('emptyData') }, { status: raid ? 200 : 404 });
};
