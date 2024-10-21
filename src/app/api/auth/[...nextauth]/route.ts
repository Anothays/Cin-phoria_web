
import { login } from "@/services/authentication";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const handlers = NextAuth({
  session: { strategy: 'jwt', maxAge: 86400 },

  callbacks: {
    async jwt({ token, user, account }) {
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
    // async redirect({ url, baseUrl }) {
    //   try {
    //     console.log(baseUrl, url);
    //     console.log("-------");

    //     const params = new URLSearchParams(new URL(url).search);
    //     const callbackUrl = params.get('callbackUrl');
    //     if (!callbackUrl && callbackUrl !== '/') return baseUrl;
    //     console.log("CALLBACK___URL ==> ", baseUrl + callbackUrl);
    //     return baseUrl + callbackUrl;
    //   } catch (error) {
    //     console.log("ERRROOOOOOR => ", error);
    //   }
    //   return baseUrl;
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
          return login(credentials);
        } catch (error) {
          console.error("Erreur d'auhtentification : ", error);
          return false
        }
      },
    })
  ],
}
);


export { handlers as GET, handlers as POST };


