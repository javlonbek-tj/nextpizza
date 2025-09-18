'use client';
import qs from 'qs';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useIngredients } from '../hooks';
import { cn } from '@/lib';
import { Title } from '../shared/Title';
import { FilterCheckboxGroup } from './Filter-checkbox-group';
import { PriceRange } from './Price-range';
import { DEFAULT_PRICE_FROM, DEFAULT_PRICE_TO } from '@/constants';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export function Filters({ className }: Props) {
  const { data: ingredients, isPending, isError } = useIngredients();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ingredientsIds, { toggle: toggleIngredient }] = useSet(
    new Set<string>(
      searchParams.get('ingredients')?.split(',').filter(Boolean) || []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes')?.split(',').filter(Boolean) || []
    )
  );

  const [pizzaSize, { toggle: togglePizzaSize }] = useSet(
    new Set<string>(
      searchParams.get('pizzaSize')?.split(',').filter(Boolean) || []
    )
  );

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: searchParams.get('priceFrom')
      ? Number(searchParams.get('priceFrom'))
      : undefined,
    priceTo: searchParams.get('priceTo')
      ? Number(searchParams.get('priceTo'))
      : undefined,
  });

  const updateURL = useCallback(() => {
    const params: Record<string, string | number | undefined> = {};

    if (ingredientsIds.size > 0) {
      params['ingredients'] = Array.from(ingredientsIds).join(',');
    }
    if (pizzaTypes.size > 0) {
      params['pizzaTypes'] = Array.from(pizzaTypes).join(',');
    }
    if (pizzaSize.size > 0) {
      params['pizzaSize'] = Array.from(pizzaSize).join(',');
    }
    if (prices.priceFrom && prices.priceFrom !== DEFAULT_PRICE_FROM) {
      params['priceFrom'] = prices.priceFrom;
    }
    if (prices.priceTo && prices.priceTo !== DEFAULT_PRICE_TO) {
      params['priceTo'] = prices.priceTo;
    }

    const query = qs.stringify(params, { skipNulls: true });
    router.push(`?${query}`, { scroll: false });
  }, [ingredientsIds, pizzaTypes, pizzaSize, prices, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handlePriceChange = useCallback((value: [number, number]) => {
    setPrices({
      priceFrom: value[0] === DEFAULT_PRICE_FROM ? undefined : value[0],
      priceTo: value[1] === DEFAULT_PRICE_TO ? undefined : value[1],
    });
  }, []);

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
          { label: '30 см', value: '30' },
          { label: '40 см', value: '40' },
          { label: '50 см', value: '50' },
        ]}
        name='pizza-size'
        title='Размеры'
        className='mb-5'
        values={pizzaSize}
        onClickCheckbox={(id) => togglePizzaSize(id)}
      />

      <PriceRange
        className='mb-6 pt-4 pb-7 border-gray-200 border-t border-b'
        title='Цены от и до'
        min={DEFAULT_PRICE_FROM}
        max={DEFAULT_PRICE_TO}
        step={10}
        value={[
          prices.priceFrom || DEFAULT_PRICE_FROM,
          prices.priceTo || DEFAULT_PRICE_TO,
        ]}
        onValueChange={handlePriceChange}
      />
      {!isPending && !isError && ingredients.length > 0 && (
        <FilterCheckboxGroup
          options={options}
          name='ingredients'
          title='Ингредиенты'
          limit={6}
          className='mb-5'
          values={ingredientsIds}
          onClickCheckbox={(id) => toggleIngredient(id)}
        />
      )}

      {isPending && (
        <div className='mb-5'>
          <Title text='Ингредиенты' size='sm' className='mb-3 font-bold' />
          <div className='animate-pulse space-y-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-6 bg-gray-200 rounded' />
            ))}
          </div>
        </div>
      )}

      {isError && (
        <div className='mb-5'>
          <Title text='Ингредиенты' size='sm' className='mb-3 font-bold' />
          <p className='text-gray-500 text-sm'>Ошибка загрузки ингредиентов</p>
        </div>
      )}
    </div>
  );
}
