import { Container, Filters, Title, TopBar } from '@/components/shared';
import ProductsGroupList from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                categoryId={1}
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Пепперони Фреш с перцем',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0196fc98404e73e6b8c1d543e86705f9.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0197310b1f9d7211a4311ec36dc54d19.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 3,
                    name: 'Сырная',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198cc26b1c776668f088e071d002fa3.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 4,
                    name: 'Пепперони Фреш с перцем',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198cc5d9a9a76409b7591fe60781428.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11eec6deef2a8314a75e734e42048301.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 6,
                    name: 'Сырная',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11eef31088c14df784152a1ff79438f2.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                ]}
              />
              <ProductsGroupList
                categoryId={2}
                title={'Комбо'}
                items={[
                  {
                    id: 1,
                    name: 'Пепперони Фреш с перцем',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0196fc98404e73e6b8c1d543e86705f9.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0197310b1f9d7211a4311ec36dc54d19.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 3,
                    name: 'Сырная',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198cc26b1c776668f088e071d002fa3.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 4,
                    name: 'Пепперони Фреш с перцем',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0198cc5d9a9a76409b7591fe60781428.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11eec6deef2a8314a75e734e42048301.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                  {
                    id: 6,
                    name: 'Сырная',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11eef31088c14df784152a1ff79438f2.avif',
                    price: 803,
                    items: [{ price: 803 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
