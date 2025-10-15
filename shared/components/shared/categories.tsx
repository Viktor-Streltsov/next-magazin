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
        'inline-flex flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl',
        className
      )}
    >
      {items.map(({ name, id }) => (
        <a
          href={`#${name}`}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5  cursor-pointer',
            categoryActiveId === id &&
              'bg-white shadow-mg shadow-gray-200 text-primary'
          )}
          key={id}
        >
          <span>{name}</span>
        </a>
      ))}
    </div>
  );
};
