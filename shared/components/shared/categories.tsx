'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';

interface CategoriesProps {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<CategoriesProps> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);

  return (
    <div
      className={cn(
        'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl shrink-0',
        className
      )}
    >
      {items.map(({ name, id }) => (
        <a
          href={`#${name}`}
          className={cn(
            'flex items-center font-bold h-9 sm:h-10 rounded-2xl px-3.5 sm:px-5 cursor-pointer whitespace-nowrap text-sm transition-colors',
            categoryActiveId === id
              ? 'bg-white shadow-sm shadow-gray-200/80 text-primary'
              : 'text-gray-600 hover:text-foreground'
          )}
          key={id}
        >
          <span>{name}</span>
        </a>
      ))}
    </div>
  );
};
