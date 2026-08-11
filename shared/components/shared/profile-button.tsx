import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
  compact?: boolean;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
  compact = false,
}) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          size={compact ? 'icon' : 'default'}
          className={cn(
            'flex items-center gap-1',
            compact && 'h-10 w-10 rounded-xl sm:h-10 sm:w-auto sm:px-4'
          )}
          aria-label="Войти"
        >
          <User size={16} />
          <span className={cn(compact && 'hidden sm:inline')}>Войти</span>
        </Button>
      ) : (
        <Link href="/profile">
          <Button
            variant="secondary"
            size={compact ? 'icon' : 'default'}
            className={cn(
              'flex items-center gap-2',
              compact && 'h-10 w-10 rounded-xl sm:h-10 sm:w-auto sm:px-4'
            )}
            aria-label="Профиль"
          >
            <CircleUser size={18} />
            <span className={cn(compact && 'hidden sm:inline')}>Профиль</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
