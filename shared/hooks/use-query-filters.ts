import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
        sortBy: searchParams.get('sortBy') ?? 'popular',
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });

    }

    isMounted.current = true;
  }, [filters, router]);
};
