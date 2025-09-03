import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/lib';
import Image from 'next/image';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChoosePizzaForm({ className, product }: Props) {
  return (
    <div className={cn('flex', className)}>
      <div className="flex-1">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={215}
          height={215}
        />
      </div>
      <div className="bg-gray-300">Hello</div>
    </div>
  );
}
