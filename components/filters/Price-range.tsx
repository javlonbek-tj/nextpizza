'use client';

import { useState } from 'react';
import { cn } from '@/lib';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

interface Props {
  className?: string;
  title?: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export function PriceRange({
  className,
  title,
  min,
  max,
  step,
  value = [min, max],
  onValueChange,
}: Props) {
  const [range, setRange] = useState<[number, number]>(value);

  const handleSliderChange = (value: number[]) => {
    setRange([value[0], value[1]]);
    onValueChange([value[0], value[1]]);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value) || 0;
    setRange([Math.min(newMin, range[1]), range[1]]);
    onValueChange([Math.min(newMin, range[1]), range[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value) || 0;
    setRange([range[0], Math.max(newMax, range[0])]);
    onValueChange([range[0], Math.max(newMax, range[0])]);
  };

  return (
    <div className={cn(className)}>
      {title && <p className='text-md font-bold'>{title}:</p>}

      <div className='flex items-center gap-2 mt-3 mb-5'>
        <Input
          type='number'
          value={range[0]}
          onChange={handleMinChange}
          min={min}
          max={range[1]}
        />
        <Input
          type='number'
          value={range[1]}
          onChange={handleMaxChange}
          min={range[0]}
          max={max}
        />
      </div>

      <div className='relative mt-6'>
        <Slider
          min={min}
          max={max}
          step={step}
          value={range}
          onValueChange={handleSliderChange}
          className='w-full'
        />

        {/* Floating labels */}
        <div className='absolute -bottom-6 left-0 w-full flex justify-between px-1'>
          <span className='text-sm text-gray-600'>{range[0]}</span>
          <span className='text-sm text-gray-600'>{range[1]}</span>
        </div>
      </div>
    </div>
  );
}
