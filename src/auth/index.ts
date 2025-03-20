import { JwtPayloadType } from '@/types/JwtPayloadType';
import { UserType } from '@/types/UserType';
import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
        const body = { username: credentials.email, password: credentials.password };
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login_check`, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) return null;
          return response.json();
        } catch (error) {
          console.log('ERROR', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/fullrefresh',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {

      // CE IF GERE LA CONNEXION. USER SERA UNDEFINED POUR LES PROCHAINS DECLENCHEMENT DU CALLBACK JWT
      if (user) {
        // USER CONTIENT LA REPONSE DE L'API
        token.accesstoken = user.token;
        token.user = user.user;
      }

      // CE IF GERE LES MODIFICATIONS DES DONNES DE SESSION. token CONTIENT LES INFOS A MODIFIER, ET session LES MODIFS
      if (trigger === 'update') {
        // VERIFICATION DE LA DATE D EXPIRATION DU TOKEN
        const payload = jwt.decode(token.accesstoken as string) as JwtPayloadType;
        const now = Date.now();
        if (payload.exp * 1000 < now) {
          console.log('EXPIRED TOKEN');
          session.token = null;
          session.userInfos = null;
          return null;
        }
        console.log('TOKEN', token);
        console.log('T -> SESSION', session);
        token.user = session.userInfos;
      }
      return token;
    },

    async session({ session, token }) {
      // console.log('SESSION', session);
      // console.log('token', token);
      // const payload = jwt.decode(token.accesstoken as string) as JwtPayloadType;
      // const now = Date.now();
      // if (payload.exp * 1000 < now) {
      //   console.log('EXPIRED TOKEN');
      //   session.token = null;
      //   session.userInfos = null;
      //   return session;
      // }
      session.token = token.accesstoken as string;
      session.userInfos = token.user as UserType;
      return session;
    },

    async authorized({ auth }) {
      // console.log('AUTH');
      const now = Date.now();
      const token = auth?.token ?? null;
      if (!token) {
        console.log('AUTH TOKEN DANS LE IF');
        return false;
      }
      const payload = jwt.decode(token) as JwtPayloadType;
      return payload.exp * 1000 >= now;
    },

    async signIn() {
      // console.log('SIGNIN');
      return true;
    },

    async redirect({ url }) {
      // console.log('REDIRECT', url);
      return url;
    },
  },
});
