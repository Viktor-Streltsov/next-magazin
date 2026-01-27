'use client';

import { cn } from '@/shared/lib/utils';
import React, { use } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';
import { ProfileButton } from './profile-button';

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
  const { data: session } = useSession();
  const router = useRouter();

  console.log('Session:', session);

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
    <header className={cn('px-5 border-b border-gray-100', className)}>
      <Container className="flex items-center flex-wrap gap-5 justify-between py-8">
        {/* {Левая часть} */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* {Правая часть} */}
        <div className="flex items-center gap-3">
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
