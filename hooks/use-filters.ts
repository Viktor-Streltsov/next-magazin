import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useState } from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  // Фильтрация ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet<string>(
    new Set(searchParams.get('ingredients')?.split(','))
  );

  // Фильтрация размеров
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  // Фильтрация стоимости
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  // Фильтрация типов пиццы
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    prices,
    selectedIngredients,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
