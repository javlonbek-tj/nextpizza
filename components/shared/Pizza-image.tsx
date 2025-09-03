import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export function PizzaImage({ className, imageUrl, size }: Props) {
  const dimensions = {
    20: { w: 300, h: 300 },
    30: { w: 400, h: 400 },
    40: { w: 500, h: 500 },
  }[size] ?? { w: 300, h: 300 };

  return (
    <div className={cn('flex items-center justify-center flex-1', className)}>
      <Image
        src={imageUrl}
        alt='Pizza image'
        width={dimensions.w}
        height={dimensions.h}
      />
    </div>
  );
}
