'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCart } from './product-card';
import { useIntersection } from 'react-use';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface ProductsGroupListProps {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

const ProductsGroupList: React.FC<ProductsGroupListProps> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: 0.5,
    }
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId, setActiveCategoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-4 sm:mb-5 text-2xl sm:text-[32px]"
      />
      <div
        className={cn(
          'grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10',
          listClassName
        )}
      >
        {items.map(item => (
          <ProductCart
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
