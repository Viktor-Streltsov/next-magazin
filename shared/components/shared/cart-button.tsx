'use client';

import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  compact?: boolean;
}

export const CartButton: React.FC<Props> = ({ className, compact = false }) => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const loading = useCartStore(state => state.loading);
  const items = useCartStore(state => state.items);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn(
          'group relative rounded-xl',
          compact ? 'h-10 px-3 sm:px-4' : 'px-4',
          className
        )}
        aria-label={`Корзина: ${items.length} товаров, ${totalAmount} рублей`}
      >
        {compact ? (
          <>
            <ShoppingCart size={16} strokeWidth={2} />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-primary">
                {items.length}
              </span>
            )}
            <span className="hidden sm:inline ml-1">
              <b>{totalAmount} ₽</b>
            </span>
          </>
        ) : (
          <>
            <b>{totalAmount} ₽</b>
            <span className="h-full w-px bg-white/30 mx-3" />
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} strokeWidth={2} />
              <b>{items.length}</b>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </>
        )}
      </Button>
    </CartDrawer>
  );
};
