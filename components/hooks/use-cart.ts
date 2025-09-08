import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { getCartDetails } from '@/lib/cart';
import { AddToCartDto } from '@/services/dto/cart.dto';
import { queryKeys } from '@/constants';

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: async () => {
      const data = await Api.cart.getCart();
      return getCartDetails(data);
    },
  });
}

type UpdateQtyVars = { id: number; quantity: number };

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateQtyVars) =>
      Api.cart.updateCartQty(vars.id, vars.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
}

type RemoveCartItemVars = { id: number };

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: RemoveCartItemVars) =>
      Api.cart.removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
    onError: (error) => {
      // TODO ADD TOAST AND REMOVE CONSOLE
      console.error('Failed to remove cart item:', error);
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: AddToCartDto) => Api.cart.addToCart(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
    onError: (error) => {
      // TODO ADD TOAST AND REMOVE CONSOLE
      console.error('Failed to add to cart:', error);
    },
  });
}
