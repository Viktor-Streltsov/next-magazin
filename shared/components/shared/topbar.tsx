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
        'sticky top-0 z-20 border-b border-gray-100 bg-white/95 py-3 sm:py-4 backdrop-blur supports-[backdrop-filter]:bg-white/80',
        className
      )}
    >
      <Container>
        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1 scroll-fade-right">
            <div className="scroll-x scroll-x-snap pb-0.5">
              <Categories items={categories} />
            </div>
          </div>
          <SortPopup sortBy={sortBy} className="shrink-0" />
        </div>
      </Container>
    </div>
  );
};
