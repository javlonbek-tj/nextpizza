'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/lib';
import { Title } from './Title';
import { ProductCard } from './Product-card';
import { ProductWithRelations } from '@/@types/prisma';
import { useCategoryStore } from '@/store/category';

interface Props {
  className?: string;
  categoryTitle: string;
  categoryId: number;
  listClassName?: string;
  products: ProductWithRelations[];
}

export function ProductGroupList({
  className,
  categoryTitle,
  categoryId,
  listClassName,
  products,
}: Props) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    { threshold: 0.9 }
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection, categoryId, setActiveCategoryId]);

  return (
    <div
      className={cn('scroll-mt-20', className)}
      id={categoryTitle}
      ref={intersectionRef}
    >
      <Title text={categoryTitle} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-8', listClassName)}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
