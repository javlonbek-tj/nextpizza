'use server';

import { DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO } from '@/constants';
import prisma from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  pizzaSize?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.pizzaSize
    ? params.pizzaSize.split(',').map(Number)
    : undefined;
  const pizzaTypes = params.pizzaTypes
    ? params.pizzaTypes.split(',').map(Number)
    : undefined;
  const ingredients = params.ingredients
    ? params.ingredients.split(',').map(Number)
    : undefined;
  const priceFrom = Number(params.priceFrom) || DEFAULT_PRICE_FROM;
  const priceTo = Number(params.priceTo) || DEFAULT_PRICE_TO;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ...(ingredients && {
            ingredients: {
              some: { id: { in: ingredients } },
            },
          }),

          productItems: {
            some: {
              price: { gte: priceFrom, lte: priceTo },
              ...(sizes && { size: { in: sizes } }),
              ...(pizzaTypes && { pizzaType: { in: pizzaTypes } }),
            },
          },
        },
        include: {
          ingredients: true,
          productItems: {
            where: {
              price: { gte: priceFrom, lte: priceTo },
              ...(sizes && { size: { in: sizes } }),
              ...(pizzaTypes && { pizzaType: { in: pizzaTypes } }),
            },
          },
        },
      },
    },
  });

  return categories;
};
