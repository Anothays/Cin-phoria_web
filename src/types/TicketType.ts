import { HydraMember } from "./ApiResponseType";

export interface TicketType extends HydraMember {
  id: number;
  uniqueCode: string;
  reservation: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}