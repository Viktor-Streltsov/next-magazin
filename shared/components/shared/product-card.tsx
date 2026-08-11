'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Title } from './title';
import { Button } from '../ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';

interface ProductCartProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCart: React.FC<ProductCartProps> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <article className={cn('group flex h-full flex-col', className)}>
      <Link href={`/product/${id}`} className="flex h-full flex-col">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-secondary p-4 sm:aspect-square sm:rounded-[20px] sm:p-6">
          <img
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={name}
            loading="lazy"
          />
        </div>

        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold line-clamp-2 sm:mt-4"
        />

        <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-snug text-gray-400">
          {ingredients.map(ing => ing.name).join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-lg font-semibold sm:text-xl">от {price} ₽</span>
          <Button
            variant="secondary"
            className="h-9 shrink-0 rounded-xl px-3 text-sm font-bold sm:h-10 sm:px-4 sm:text-base"
          >
            <Plus size={18} className="mr-1 sm:mr-1.5" />
            <span className="hidden sm:inline">Добавить</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>
      </Link>
    </article>
  );
};
