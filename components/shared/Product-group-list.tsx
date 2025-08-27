import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title?: string;
}

export function ProductGroupList({ className }: Props) {
  return <div className={cn(className)}></div>;
}
