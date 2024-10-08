import { HydraMember } from "./ApiResponseType";
import { ReservationType } from "./ReservationType";

export interface UserType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  email: string;
  roles: string[];
  password: string;
  reservations: ReservationType[];
  createdAt: Date;
  updatedAt: Date;
  userIdentifier: string;
}