import { CartDto } from '@/services/dto/cart.dto';
import { CartItemState } from '@/store/cart';

export interface ReturnProps {
  items: CartItemState[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.ProductItem.Product.name,
    pizzaType: item.ProductItem.pizzaType,
    pizzaSize: item.ProductItem.size,
    quantity: item.quantity,
    imageUrl: item.ProductItem.Product.imageUrl,
    price: 17,
    ingredients: item.ingredients.map((ingredient) => {
      return { name: ingredient.name, price: ingredient.price };
    }),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
