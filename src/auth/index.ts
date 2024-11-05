import { UserType } from "@/types/UserType";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt', maxAge: 86400 },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const body = {
            username: credentials.email,
            password: credentials.password
          };
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login_check`, {
              body: JSON.stringify(body),
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) throw new Error("Erreur d'authentification");
            const results = await response.json();
            return results;
          } catch (error) {
            console.log(error);
            throw error
          }
        } catch (error) {
          console.error("Erreur d'auhtentification : ", error);
          return false
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accesstoken = user.token;
        token.user = user.user;
      };
      return token;
    },
    async session({ session, token }) {

      session.token = token.accesstoken as string;
      session.userInfos = token.user as UserType;

      return session;
    },

  },
});