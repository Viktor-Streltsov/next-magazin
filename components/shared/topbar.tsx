import { cn } from '@/lib/utils';
import React from 'react';
import { SortPopup } from './sort-popup';
import { Categories } from './categories';
import { Container } from './container';

interface TopBarProps {
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex flex-wrap gap-5 items-center p-1 justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
