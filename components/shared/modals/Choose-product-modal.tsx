'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib';
import { ProductForm } from '../Product-form';

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
        size='xl'
        className={cn('min-h-[500px] p-0 overflow-hidden', className)}
      >
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
}
