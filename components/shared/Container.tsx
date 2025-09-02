import { PropsWithChildren } from 'react';
import { cn } from '@/lib';

interface Props {
  className?: string;
}

export function Container({ className, children }: PropsWithChildren<Props>) {
  return (
    <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
  );
}
