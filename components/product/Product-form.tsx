import { ProductWithRelations } from '@/prisma/@types/prisma';

import { ChoosePizzaForm } from './Choose-pizza-form';

interface Props {
  product: ProductWithRelations;
  onClose: () => void;
}

export function ProductForm({ product, onClose }: Props) {
  const isPizza = Boolean(product.productItems[0].pizzaType);
  return <ChoosePizzaForm product={product} onClose={onClose} />;
}
