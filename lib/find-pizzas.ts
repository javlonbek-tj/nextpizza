'use server';

import prisma from '@/prisma/prisma-client';

export const findPizzas = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          productItems: true,
        },
      },
    },
  });
  return categories;
};
