import { UserType } from '@/types/UserType';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { JwtPayloadType } from '@/types/JwtPayloadType';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const body = {
          username: credentials.email,
          password: credentials.password,
        };
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login_check`, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) return null;
          return response.json();
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('TOKEN', token);
      if (user) {
        // USER CONTIENT LA REPONSE DE L'API
        token.accesstoken = user.token;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('SESSION');
      const payload = jwt.decode(token.accesstoken as string) as JwtPayloadType;
      const now = Date.now();
      if (payload.exp * 1000 < now) return null;
      session.token = token.accesstoken as string;
      session.userInfos = token.user as UserType;
      return session;
    },
    async authorized({ auth }) {
      console.log('AUTH');
      const now = Date.now();
      const token = auth?.token ?? null;
      if (!token) return false;
      const payload = jwt.decode(token) as JwtPayloadType;
      return payload.exp * 1000 >= now;
    },
    async signIn({ credentials }) {
      console.log('SIGNIN', credentials);
      return true;
    },
    async redirect({ url }) {
      console.log('REDIRECT');
      return url;
    },
  },
});
