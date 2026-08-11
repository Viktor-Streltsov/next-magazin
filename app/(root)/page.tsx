import {
  Container,
  Title,
  TopBar,
  Stories,
} from '@/shared/components/shared';
import { CatalogLayout } from '@/shared/components/shared/catalog-layout';
import ProductsGroupList from '@/shared/components/shared/products-group-list';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>
      <Container className="mt-6 sm:mt-10">
        <Title
          text="Все пиццы"
          size="lg"
          className="font-extrabold text-2xl sm:text-[32px]"
        />
      </Container>

      <TopBar
        categories={categories.filter(category => category.products.length > 0)}
        sortBy={params.sortBy}
      />

      <Stories />

      <Container className="mt-6 sm:mt-10 pb-10 sm:pb-14">
        <CatalogLayout>
          <div className="flex flex-col gap-10 sm:gap-16">
            {categories.map(
              category =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    categoryId={category.id}
                    title={category.name}
                    items={category.products}
                  />
                )
            )}
          </div>
        </CatalogLayout>
      </Container>
    </>
  );
}
