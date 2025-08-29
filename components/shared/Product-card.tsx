import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Title } from './Title';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface Props {
  className?: string;
  product: any; // TODO: replace with actual product type
}

export function ProductCard({ className, product }: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={215}
          height={215}
        />
      </div>

      {/* Content below */}
      <div className='flex flex-col flex-1 mt-4'>
        <Title
          text={product.name}
          size='sm'
          className='font-bold leading-tight line-clamp-2'
        />

        {product.ingredients.length > 0 && (
          <p className='text-sm text-gray-400 mt-2 line-clamp-2'>
            {product.ingredients
              .map((ingredient) => ingredient.name)
              .join(', ')}
          </p>
        )}

        <div className='flex items-center justify-between mt-auto pt-4'>
          <span className='text-[20px]'>
            от <b>{product.productItems[0].price} ₽</b>
          </span>

          <Button variant='secondary' className='text-base font-bold'>
            <Plus size={20} className='mr-1' /> Добавить
          </Button>
        </div>
      </div>
    </div>
  );
}
