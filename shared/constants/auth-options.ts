import { UserRole } from '@prisma/client';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
      profile(profile) {
        return {
          id: Number(profile.id),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        if (!findUser.verified) {
          return null;
        }

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        let email = user.email || profile?.email;

        if (!email && account?.provider === 'github') {
          email = `github_${account.providerAccountId}@placeholder.local`;
        }

        if (!email) {
          console.error('❌ No email provided by OAuth provider');
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          user.id = findUser.id;
          user.email = findUser.email;

          return true;
        }

        const newUser = await prisma.user.create({
          data: {
            email: email,
            fullName: user.name || user.image || 'GitHub User',
            password: hashSync(
              account?.providerAccountId ?? user.id?.toString() ?? 'default',
              10
            ),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            role: 'USER',
          },
        });

        user.id = newUser.id;
        user.email = newUser.email;

        return true;
      } catch (error) {
        console.error('❌ Error [SIGNIN]:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        return token;
      }

      if (token.id) {
        return token;
      }

      if (token.email) {
        const findUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        });

        if (findUser) {
          token.id = String(findUser.id);
          token.email = findUser.email;
          token.fullName = findUser.fullName;
          token.role = findUser.role;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email || '';
        session.user.role = token.role;
        session.user.name = token.fullName || token.name || '';
      }

      return session;
    },
  },
};
