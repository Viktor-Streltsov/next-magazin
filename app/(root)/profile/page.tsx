import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components/shared';
import { getUserSession } from '@/shared/lib';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getUserSession();

  console.log('Session:', session); // Проверьте, что здесь

  if (!session?.id) {
    return redirect('/not-auth');
  }

  console.log('Looking for user with id:', session.id); // Проверьте ID

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
