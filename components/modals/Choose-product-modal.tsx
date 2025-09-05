'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib';
import { ProductForm } from '../shared/Product-form';

import { ProductWithRelations } from '@/@types/prisma';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ChooseProductModal({ className, product }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        size="xl"
        className={cn('p-0 min-h-[500px] overflow-hidden', className)}
      >
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
}
