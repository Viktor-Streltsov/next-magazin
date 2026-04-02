'use client';

import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface SortPopupProps {
  className?: string;
  sortBy?: string;
}

export const SortPopup: React.FC<SortPopupProps> = ({ sortBy, className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = sortBy === 'new' ? 'new' : 'popular';

  const handleSortClick = () => {
    const nextSort = currentSort === 'popular' ? 'new' : 'popular';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', nextSort);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
        className
      )}
      onClick={handleSortClick}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">
        {currentSort === 'popular' ? 'популярное' : 'новое'}
      </b>
    </button>
  );
};
