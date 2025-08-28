import { cn } from '@/lib/utils';
import { Title } from './Title';

interface Props {
  className?: string;
  title: string;
  listClassName?: string;
}

export function ProductGroupList({ className, title, listClassName }: Props) {
  return (
    <div className={className}>
      <Title text={title} size='lg' className='font-extrabold' />

      <div className={cn('grid grid-cols-3 gap-4', listClassName)}></div>
    </div>
  );
}
