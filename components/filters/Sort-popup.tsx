import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib';

interface Props {
  className?: string;
}

export function SortPopup({ className }: Props) {
  return (
    <div
      className={cn(
        'bg-gray-50 flex items-center gap-1 py-3 px-5 rounded-2xl',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <span>Сортировка:</span>
      <span className='text-primary'>рейтингу</span>
    </div>
  );
}
