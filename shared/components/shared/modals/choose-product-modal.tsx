'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ProductForm } from '../product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-full max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] lg:!max-w-[1060px] min-h-[auto] sm:min-h-[550px] bg-white overflow-y-auto max-h-[95vh]',
          className
        )}
      >
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>

        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
