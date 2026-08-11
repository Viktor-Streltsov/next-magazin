'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutSidebar, Container, Title } from '@/shared/components/shared';
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/shared/components/shared/checkout-cart';
import { useCart } from '@/shared/hooks';
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-form-schema';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createOrder } from '@/app/actions';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-6 sm:mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-6 sm:mb-8 text-2xl sm:text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="flex flex-col gap-8 sm:gap-10 flex-1 mb-12 sm:mb-20">
              <div className="flex flex-col gap-5">
                <CheckoutCart
                  onClickCountButton={onClickCountButton}
                  removeCartItem={removeCartItem}
                  items={items}
                  loading={loading}
                />
              </div>

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>

            <div className="w-full lg:w-[450px] lg:shrink-0">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
                className="lg:sticky lg:top-4"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
