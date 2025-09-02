import { Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Title } from './Title';
import { Button } from '../ui/button';
import { Ingredient, ProductItem } from '@/generated/prisma/client';

interface Props {
  className?: string;
  id: number;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  productItems: ProductItem[];
}

export function ProductCard({ className, ingredients, ...product }: Props) {
  return (
    <Link href={`/product/${product.id}`} className={className}>
      <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={215}
          height={215}
        />
      </div>

      <div className='flex flex-col flex-1 mt-4'>
        <Title
          text={product.name}
          size='sm'
          className='font-bold leading-tight line-clamp-1 mb-2'
        />

        {ingredients.length > 0 && (
          <p className='text-sm text-gray-400 line-clamp-2'>
            {ingredients.map((ingredient) => ingredient.name).join(', ')}
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
    </Link>
  );
}
