import { cn } from '@/lib';
import { Categories } from './Categories';
import { SortPopup } from './Sort-popup';
import { Category } from '@/generated/prisma/client';
import { Container } from './Container';

interface Props {
  className?: string;
  categories: Category[];
}

export function TopBar({ className, categories }: Props) {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white shadow-lg shadow-black/5 z-10 py-5',
        className
      )}
    >
      <Container className='flex justify-between items-center gap-5 '>
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
}
