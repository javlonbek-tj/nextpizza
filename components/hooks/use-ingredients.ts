'use client';

import { queryKeys } from '@/constants';
import { Ingredient } from '@/generated/prisma/client';
import { getAll } from '@/services/ingredients';
import { useQuery } from '@tanstack/react-query';

export const useIngredients = () => {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery<Ingredient[]>({
    queryKey: queryKeys.ingredients,
    queryFn: getAll,
  });

  return { data, isPending, isError };
};
