import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shared/lib';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getUserSession(); // теперь это user, а не session

  if (!user) {
    return redirect('/not-auth');
  }

  // Проверяем что id существует
  if (!user.id) {
    console.error('User exists but id is missing:', user);
    return redirect('/not-auth');
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      id: Number(user.id), // используем user.id вместо session.id
    },
  });

  if (!dbUser) {
    return redirect('/not-auth');
  }

  return <div>Profile Page: {dbUser.fullName}</div>;
}
