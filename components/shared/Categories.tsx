'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/data/dummy';

interface Props {
  className?: string;
}

export function Categories({ className }: Props) {
  const [active, setActive] = useState(1);
  return (
    <div className={cn('flex justify-between items-center gap-5', className)}>
      <div className='bg-gray-50 flex items-center gap-1 p-1 rounded-2xl'>
        {categories.map((category, index) => (
          <a
            key={category.value}
            href='#'
            className={cn(
              'hover:bg-white px-5 py-2 rounded-xl hover:text-primary transition duration-300 font-medium',
              active === index + 1 && 'bg-white text-primary'
            )}
            onClick={() => setActive(index + 1)}
          >
            {category.label}
          </a>
        ))}
      </div>
      <div className='bg-gray-50 flex items-center gap-1 py-3 px-5 rounded-2xl'>
        <ArrowUpDown size={16} />
        <span>Сортировка:</span>
        <span className='text-primary'>рейтингу</span>
      </div>
    </div>
  );
}
