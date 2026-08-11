'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal';

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b border-gray-100', className)}>
      <Container className="flex flex-col md:flex-row items-center gap-4 md:gap-5 justify-between py-4 md:py-8">
        <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-4">
          <Link href="/">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image src="/logo.png" alt="Logo" width={35} height={35} />
              <div>
                <h1 className="text-xl sm:text-2xl uppercase font-black">
                  Next Pizza
                </h1>
                <p className="hidden sm:block text-sm text-gray-400 leading-3">
                  вкусней уже некуда
                </p>
              </div>
            </div>
          </Link>

          <div className="flex md:hidden items-center gap-2">
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>
        </div>

        {hasSearch && (
          <div className="w-full md:flex-1 md:mx-6 lg:mx-10 order-last md:order-none">
            <SearchInput />
          </div>
        )}

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
