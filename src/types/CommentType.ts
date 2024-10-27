import { HydraMember } from "./ApiResponseType";
import { UserType } from "./UserType";

export interface CommentType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  body: string;
  rate: number;
  user: UserType;

}