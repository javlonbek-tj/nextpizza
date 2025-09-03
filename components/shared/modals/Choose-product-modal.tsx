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

  const handleClose = () => {
    router.back();
  };
  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          'bg-white max-w-[1060px] min-h-[500px] overflow-hidden',
          className
        )}
      >
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
}
