import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/Container';
import prisma from '@/prisma/prisma-client';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      productItems: true,
      category: {
        include: {
          products: {
            include: {
              productItems: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return <Container className='my-10'></Container>;
}
