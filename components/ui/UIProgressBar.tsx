'use client';

import { Progress } from '@heroui/react';

interface Props {
  value: number;
}
export const UIProgressBar = ({ value }: Props) => {
  return <Progress aria-label="Loading..." className="max-w-md" value={value} size="sm" />;
};
