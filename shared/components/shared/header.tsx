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

  const authControls = (
    <>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} compact />
      {hasCart && <CartButton compact />}
    </>
  );

  return (
    <header className={cn('border-b border-gray-100 bg-white', className)}>
      <Container className="py-4 lg:py-6">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 md:gap-x-6">
          <Link href="/" className="min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={35}
                height={35}
                className="shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl uppercase font-black truncate">
                  Next Pizza
                </h1>
                <p className="hidden md:block text-sm text-gray-400 leading-3">
                  вкусней уже некуда
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:hidden">
            {authControls}
          </div>

          {hasSearch && (
            <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 min-w-0">
              <SearchInput />
            </div>
          )}

          <div className="hidden md:flex items-center justify-end gap-2 shrink-0">
            {authControls}
          </div>
        </div>
      </Container>
    </header>
  );
};
