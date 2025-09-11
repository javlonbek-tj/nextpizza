'use client';
import { cn } from '@/lib';
import { Title } from '../shared/Title';
import { FilterCheckboxGroup } from './Filter-checkbox-group';
import { PriceRange } from './Price-range';
import { useIngredients } from '../hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO } from '@/constants';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export function Filters({ className }: Props) {
  // TODO: add loading state and error state
  const { data: ingredients, isPending, isError } = useIngredients();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ingredientsIds, { toggle: toggleIngredient }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',') || [])
  );

  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(searchParams.get('pizza-type')?.split(',') || [])
  );

  const [pizzaSizes, { toggle: togglePizzaSize }] = useSet(
    new Set<string>(searchParams.get('pizza-size')?.split(',') || [])
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('price-from')) || undefined,
    priceTo: Number(searchParams.get('price-to')) || undefined,
  });

  const params: Record<string, string | number | undefined> = {};

  if (ingredientsIds.size > 0) {
    params['ingredients'] = Array.from(ingredientsIds).join(',');
  }

  if (pizzaTypes.size > 0) {
    params['pizza-type'] = Array.from(pizzaTypes).join(',');
  }

  if (pizzaSizes.size > 0) {
    params['pizza-size'] = Array.from(pizzaSizes).join(',');
  }

  if (prices.priceFrom !== undefined) {
    params['price-from'] = prices.priceFrom;
  }

  if (prices.priceTo !== undefined) {
    params['price-to'] = prices.priceTo;
  }

  const query = qs.stringify(params, { skipNulls: true });

  useEffect(() => {
    router.push(`?${query}`, { scroll: false });
  }, [query, router]);

  const options = ingredients.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));
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
        values={pizzaTypes}
        onClickCheckbox={(id) => togglePizzaType(id)}
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
        values={pizzaSizes}
        onClickCheckbox={(id) => togglePizzaSize(id)}
      />

      <PriceRange
        className='mb-6 pt-4 pb-7 border-gray-200 border-t border-b'
        title='Цены от и до'
        min={DEFAULT_PRICE_FROM}
        max={DEFAULT_PRICE_TO}
        step={10}
        value={[prices.priceFrom || 0, prices.priceTo || 1000]}
        onValueChange={(value) =>
          setPrices({ priceFrom: value[0], priceTo: value[1] })
        }
      />

      <FilterCheckboxGroup
        options={options}
        name='ingredients'
        title='Ингредиенты'
        limit={6}
        className='mb-5'
        values={ingredientsIds}
        onClickCheckbox={(id) => toggleIngredient(id)}
      />
      <div>{ingredientsIds}</div>
      <div>{pizzaTypes}</div>
      <div>{pizzaSizes}</div>
      <div>
        From: {prices.priceFrom} – To: {prices.priceTo}
      </div>
    </div>
  );
}
