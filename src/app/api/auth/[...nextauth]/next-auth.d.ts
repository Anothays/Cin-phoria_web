import { UserType } from "@/types/UserType";

declare module 'next-auth' {

  interface User {
    id: number;
    email: string;
    roles: string[];
    password: string;
    reservations: ReservationType[];
    createdAt: Date;
    updatedAt: Date;
    userIdentifier: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType;
    token: string;
  }


  interface JWT {
    accessToken: string;
    iat: number;
    exp: number;
    jti: string;
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
  }
}