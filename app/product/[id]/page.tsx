import React from 'react';
import {
  Container,
  GroupVariant,
  ProductImage,
  Title,
} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.image} size={30} />

        <div className="w-[490px] bg-[#f7f6f5] p-7 rounded-2xl">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            exercitationem quaerat aut odio impedit cum, facere quidem.
            Assumenda recusandae illo adipisci neque esse eligendi omnis, beatae
            itaque nesciunt vero laboriosam.
          </p>

          <GroupVariant
            value="1"
            items={[
              {
                name: 'Litle',
                value: '1',
              },
              {
                name: 'asdfasdf',
                value: '2',
              },
              {
                name: 'big',
                value: '3',
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
