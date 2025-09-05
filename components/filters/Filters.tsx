'use client';
import { cn } from '@/lib';
import { Title } from '../shared/Title';
import { FilterCheckboxGroup } from './Filter-checkbox-group';
import { PriceRange } from './Price-range';
import { useIngredients } from '../hooks';

interface Props {
  className?: string;
}

export function Filters({ className }: Props) {
  // TODO: add loading state
  const { data: ingredients, isPending } = useIngredients();

  const options = ingredients.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));
  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <FilterCheckboxGroup
        options={[
          { label: 'Тонкое', value: '1' },
          { label: 'Традиционное', value: '2' },
        ]}
        name="pizza-type"
        title="Тип теста"
        className="mb-5"
      />

      <FilterCheckboxGroup
        options={[
          { label: '30 см', value: '1' },
          { label: '40 см', value: '2' },
          { label: '50 см', value: '3' },
        ]}
        name="pizza-size"
        title="Размеры"
        className="mb-5"
      />

      <PriceRange
        className="mb-6 pt-4 pb-7 border-gray-200 border-t border-b"
        title="Цены от и до"
        min={0}
        max={1000}
        step={10}
      />

      <FilterCheckboxGroup
        options={options}
        name="ingredients"
        title="Ингредиенты"
        limit={6}
        className="mb-5"
      />
    </div>
  );
}
