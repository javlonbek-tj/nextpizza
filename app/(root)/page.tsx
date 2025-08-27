import { Categories } from '@/components/shared/Categories';
import { Container } from '@/components/shared/Container';
import { Filters } from '@/components/shared/Filters';
import { Header } from '@/components/shared/Header';
import { Title } from '@/components/shared/Title';

export default function Home() {
  return (
    <>
      <Header />;
      <Container>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>
      <Container className='mt-4'>
        <Categories />
      </Container>
      <Container className='mt-6 flex gap-5'>
        <div className='w-[250px]'>
          <Filters />
        </div>
        <div className='flex-1'>
          <div className='flex flex-col gap-16'></div>
        </div>
      </Container>
    </>
  );
}
