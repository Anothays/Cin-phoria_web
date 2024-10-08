
import { login } from "@/services/authentication";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const handlers = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("user ==> ", user);
      // console.log("token ==> ", token);

      if (account) {
        token.accesstoken = user.token;
        token.user = user.user;
      };
      return token;
    },
    async session({ session, token }) {
      session.token = token.accesstoken as string;
      session.user = token.user;
      return session
    },
    // signIn({ user, account, profile, credentials }) {
    //   console.log("user ==> ", user);
    //   console.log("account ==> ", account);
    //   console.log("profile ==> ", profile);
    //   console.log("profile ==> ", profile);
    //   return true;
    // },
  },
  providers: [
    Credentials({

      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await login(credentials);
          return res;
        } catch (error) {
          console.error("Erreur d'auhtentification : ", error);
          return false
        }
      },
    })
  ]
}
);


export { handlers as GET, handlers as POST };


