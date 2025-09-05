import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from '@/generated/prisma/client';

export type CartItemDto = CartItem & {
  ProductItem: ProductItem & { Product: Product };
  ingredients: Ingredient[];
};

export interface CartDto extends Cart {
  items: CartItemDto[];
}
