import { cn } from '@/lib';
import { Categories } from '../categories/Categories';
import { SortPopup } from '../filters/Sort-popup';
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
        'top-0 z-10 sticky bg-white shadow-black/5 shadow-lg py-5',
        className
      )}
    >
      <Container className="flex justify-between items-center gap-5">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  );
}
