import { Filters } from '@/components/filters/Filters';
import { ProductGroupList } from '@/components/product';
import { Container } from '@/components/shared';
import { Title } from '@/components/shared';
import { TopBar } from '@/components/shared';
import { findPizzas } from '@/lib/product';
import { GetSearchParams } from '@/lib/product/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories} />

      <Container className='flex gap-16 mt-10 pb-14'>
        <div className='w-[250px]'>
          <Filters />
        </div>
        <div className='flex flex-col flex-1 gap-16'>
          {categories.map(
            (category) =>
              category.products.length > 0 && (
                <ProductGroupList
                  key={category.id}
                  categoryTitle={category.name}
                  categoryId={category.id}
                  products={category.products}
                />
              )
          )}
        </div>
      </Container>
    </>
  );
}
