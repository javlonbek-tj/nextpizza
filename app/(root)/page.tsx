import { Categories } from '@/components/shared/Categories';
import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { ProductGroupList } from '@/components/shared/Product-group-list';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/Top-bar';
import { findPizzas } from '@/lib/find-pizzas';

export default async function Home() {
  const categories = await findPizzas();
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories} />

      <Container className='mt-10 flex gap-16 pb-14'>
        <div className='w-[250px]'>
          <Filters />
        </div>
        <div className='flex-1 flex flex-col gap-16'>
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
