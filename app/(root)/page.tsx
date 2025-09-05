import { Container } from '@/components/shared';
import { Filters } from '@/components/shared';
import { ProductGroupList } from '@/components/shared';
import { Title } from '@/components/shared';
import { TopBar } from '@/components/shared';
import { findPizzas } from '@/lib';

export default async function Home() {
  const categories = await findPizzas();
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
