'use client'

import { Ingredient } from '@/generated/prisma/client'
import { getAll } from '@/services/ingredients'
import { useQuery } from '@tanstack/react-query'

export const useIngredients = () => {
  const {data = [], isPending} = useQuery<Ingredient[]>({
    queryKey: ['ingredients'],
    queryFn: getAll,
  })

  return {data, isPending}
}