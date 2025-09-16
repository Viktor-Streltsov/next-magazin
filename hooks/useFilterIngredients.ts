import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
  const [ingredients, setIngredients] = useState<ReturnProps['ingredients']>(
    []
  );
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet<string>(new Set(values));

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredient = await Api.ingredients.getAll();
        setIngredients(
          ingredient.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  const setSelectedIngredients = (ids: string[]) => {
    ids.forEach(selectedIds.add);
  };

  return {
    ingredients,
    loading,
    onAddId: toggle,
    selectedIngredients: selectedIds,
  };
};
