'use client';

import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/generated/prisma/client';
import { cn } from '@/lib';
import { Api } from '@/services/api-client';

interface Props {
  className?: string;
}

export function SearchInput({ className }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  useClickAway(ref, () => {
    setFocused(false);
  });

  const { data: searchedProducts = [] } = useQuery<Product[], Error>({
    queryKey: ['products', debouncedQuery],
    queryFn: () => Api.products.search(debouncedQuery),
    enabled: debouncedQuery.trim().length > 2,
    staleTime: 30 * 1000,
  });

  return (
    <>
      {focused && (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-100' />
      )}
      <div
        ref={ref}
        className={cn(
          'flex-1 mx-10 rounded-2xl flex items-center px-5 py-3 bg-gray-100 relative z-100 transition duration-300',
          className
        )}
      >
        <Search className='text-gray-400 h-5' />
        <input
          type='text'
          className='w-full outline-none pl-5'
          placeholder='Найти пиццу...'
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchedProducts && searchedProducts.length > 0 && (
          <div
            className={cn(
              'absolute left-0 right-0 top-14 bg-white rounded-xl shadow-md transition-all duration-200 max-h-96 overflow-y-auto z-[100] origin-top',
              focused
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            )}
          >
            {searchedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className='flex items-center gap-3 py-2 hover:bg-orange-50 px-3 w-full transition duration-200'
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className='w-8 h-8 rounded-full'
                  width={32}
                  height={32}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
