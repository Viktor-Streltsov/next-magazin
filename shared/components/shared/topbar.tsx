import { cn } from '@/shared/lib/utils';
import React from 'react';
import { SortPopup } from './sort-popup';
import { Categories } from './categories';
import { Container } from './container';
import { Category } from '@prisma/client';

interface TopBarProps {
  categories: Category[];
  className?: string;
  sortBy?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  sortBy,
  categories,
  className,
}) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex flex-wrap gap-3 sm:gap-5 items-center p-1 justify-between">
        <Categories items={categories} className="max-w-full overflow-x-auto scrollbar" />
        <SortPopup sortBy={sortBy} className="shrink-0" />
      </Container>
    </div>
  );
};
