import { cn } from '@/lib/utils';
import { Title } from './Title';
import { ProductCard } from './Product-card';

interface Props {
  className?: string;
  title: string;
  listClassName?: string;
  products: any[]; // TODO: replace with actual product type
}

export function ProductGroupList({
  className,
  title,
  listClassName,
  products,
}: Props) {
  return (
    <div className={className}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-8', listClassName)}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
