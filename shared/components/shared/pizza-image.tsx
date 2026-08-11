import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-1 relative w-full',
        className
      )}
    >
      <img
        src={imageUrl}
        alt="Pizza"
        className={cn(
          'relative z-10 transition-all duration-300 object-contain',
          {
            'w-[180px] h-[180px] sm:w-[300px] sm:h-[300px]': size === 20,
            'w-[220px] h-[220px] sm:w-[400px] sm:h-[400px]': size === 30,
            'w-[260px] h-[260px] sm:w-[500px] sm:h-[500px]': size === 40,
          }
        )}
      />

      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200',
          {
            'w-[220px] h-[220px] sm:w-[450px] sm:h-[450px]': size === 20 || size === 30,
            'w-[280px] h-[280px] sm:w-[450px] sm:h-[450px]': size === 40,
          }
        )}
      />
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100',
          {
            'w-[180px] h-[180px] sm:w-[370px] sm:h-[370px]': size === 20 || size === 30,
            'w-[220px] h-[220px] sm:w-[370px] sm:h-[370px]': size === 40,
          }
        )}
      />
    </div>
  );
};
