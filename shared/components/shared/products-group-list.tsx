'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCart } from './product-card';
import { useIntersection } from 'react-use';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';

interface ProductsGroupListProps {
  title: string;
  items: any[];
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
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map(item => (
          <ProductCart
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.image}
            price={item.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
