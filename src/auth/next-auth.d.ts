import { UserType } from "@/types/UserType";
import "next-auth";
import "next-auth/jwt";

declare module 'next-auth' {

  interface User {
    user: UserType;
    token: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userInfos: UserType;
    token: string;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    userInfos: UserType;
    iat: number;
    exp: number;
    jti: string;
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
  }
}
