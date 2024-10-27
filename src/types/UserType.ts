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
  email: string;
  roles: string[];
  password: string;
  reservations: ReservationType[];
  createdAt: Date;
  updatedAt: Date;
  userIdentifier: string;
  comments: CommentType[];
}