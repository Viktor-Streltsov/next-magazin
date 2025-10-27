import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  items: ProductItem[],
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  );

  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца, ингредиенты: ${
    selectedIngredients.size
      ? ingredients
          .filter(ingredient => selectedIngredients.has(ingredient.id))
          .map(ingredient => ingredient.name)
          .join(', ')
      : 'стандартные'
  }`;

  return { totalPrice, textDetaills };
};
