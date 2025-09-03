import { ProductWithRelations } from '@/@types/prisma';

import { cn } from '@/lib/utils';
import { ChoosePizzaForm } from './Choose-pizza-form';

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export function ProductForm({ className, product }: Props) {
  const isPizza = Boolean(product.productItems[0].pizzaType);
  return (
    <div className={cn(className)}>
      <ChoosePizzaForm product={product} />
    </div>
  );
}
