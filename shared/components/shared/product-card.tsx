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
    <div
      className={cn('flex flex-wrap items-center content-between', className)}
    >
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-4 sm:p-6 bg-secondary rounded-lg h-[200px] sm:h-[260px] w-full">
          <img
            className="w-full max-w-[215px] h-auto max-h-[180px] sm:max-h-[215px] object-contain"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients.map(ing => ing.name).join(', ')}
        </p>

        <div className="w-full flex flex-wrap gap-2 justify-between items-center mt-4">
          <span className="text-lg sm:text-[20px]">от {price} ₽</span>
          <Button variant="secondary" className="text-sm sm:text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
