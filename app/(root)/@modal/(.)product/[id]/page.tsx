import { notFound } from 'next/navigation';
import prisma from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/components/modals/Choose-product-modal';

export default async function ProductModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });
  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
