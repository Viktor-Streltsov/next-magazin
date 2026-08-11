import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  prise: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора ПРОДУКТА
 */

export const ChooseProductForm: React.FC<Props> = ({
  name,
  prise,
  imageUrl,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn(className, 'flex flex-col lg:flex-row flex-1 w-full gap-6 lg:gap-0')}>
      <div className="flex items-center justify-center flex-1 relative w-full min-h-[240px] sm:min-h-[350px]">
        <img
          src={imageUrl}
          alt={name}
          className="relative z-10 w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] object-contain transition-all duration-300"
        />
      </div>

      <div className="w-full lg:w-[490px] lg:shrink-0 bg-[#f7f6f5] p-5 sm:p-7 rounded">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {prise} ₽
        </Button>
      </div>
    </div>
  );
};
