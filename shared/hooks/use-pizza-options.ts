import { useEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';
import { Variant } from '../components/shared/group-variants';

interface ReturnProps {
  size: PizzaSize;
  setSize: (size: PizzaSize) => void;
  type: PizzaType;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  availableSizes: Variant[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availableSizes.find(
      item => item.value === String(size) && !item.disabled
    );
    const availableSize = availableSizes.find(item => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredient,
    availableSizes,
  };
};
