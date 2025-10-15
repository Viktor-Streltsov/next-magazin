import React from 'react';
import { PizzaImage } from './pizza-image';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  loading?: boolean;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onClickAdd,
  className,
}) => {
  const textDetaills = '30 см, традиционнок тесто 30';
  const totalPrice = 350;

  return (
    <div className={cn(className, 'flex flex-1 w-full')}>
      <PizzaImage imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
