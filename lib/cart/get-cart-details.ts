import { CartDto } from '@/services/dto/cart.dto';
import { CartItemState } from '@/store/cart';

export interface ReturnProps {
  items: CartItemState[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.productItem.product.name,
    pizzaType: item.productItem.pizzaType,
    pizzaSize: item.productItem.size,
    quantity: item.quantity,
    imageUrl: item.productItem.product.imageUrl,
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
