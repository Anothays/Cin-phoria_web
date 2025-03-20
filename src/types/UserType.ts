import { HydraMember } from "./ApiResponseType";
import { CommentType } from "./CommentType";
import { ReservationType } from "./ReservationType";

export interface UserType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  firstname: string;
  lastname: string;
  fullName: string;
  email: string;
  roles: string[];
  password: string;
  reservations: ReservationType[];
  createdAt: string;
  updatedAt: string;
  userIdentifier: string;
  comments: CommentType[];
}