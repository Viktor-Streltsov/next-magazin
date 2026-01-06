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
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px] w-[100%]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients.map(ing => ing.name).join(', ')}
        </p>

        <div className="w-[100%] flex justify-between items-center mt-4">
          <span className="text-[20px]">от {price} ₽</span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
