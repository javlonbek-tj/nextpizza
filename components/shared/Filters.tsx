import { cn } from '@/lib/utils';

import { Title } from './Title';
import { FilterCheckboxGroup } from './Filter-checkbox-group';
import { PriceRange } from './Price-range';
import { ingredients } from '@/data/dummy';

interface Props {
  className?: string;
}

export function Filters({ className }: Props) {
  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <FilterCheckboxGroup
        options={[
          { label: 'Тонкое', value: '1' },
          { label: 'Традиционное', value: '2' },
        ]}
        name='pizza-type'
        title='Тип теста'
        className='mb-5'
      />

      <FilterCheckboxGroup
        options={[
          { label: '30 см', value: '1' },
          { label: '40 см', value: '2' },
          { label: '50 см', value: '3' },
        ]}
        name='pizza-size'
        title='Размеры'
        className='mb-5'
      />

      <PriceRange
        className='border-t border-gray-200 pt-4 border-b pb-7 mb-6'
        title='Цены от и до'
        min={0}
        max={1000}
        step={10}
      />

      <FilterCheckboxGroup
        options={ingredients}
        name='ingredients'
        title='Ингредиенты'
        limit={6}
        className='mb-5'
      />
    </div>
  );
}
