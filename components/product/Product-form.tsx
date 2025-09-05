import { ProductWithRelations } from '@/@types/prisma';

import { ChoosePizzaForm } from './Choose-pizza-form';

interface Props {
  product: ProductWithRelations;
}

export function ProductForm({ product }: Props) {
  const isPizza = Boolean(product.productItems[0].pizzaType);
  return <ChoosePizzaForm product={product} />;
}
