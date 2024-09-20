import { HydraMember } from "./ApiResponseType";

export interface UserType extends HydraMember {
  id: number;
  email: string;
  roles: string[];
  password: string;
  reservations: any[];
  createdAt: Date;
  updatedAt: Date;
  userIdentifier: string;
}