import { HydraMember } from "./ApiResponseType";

export interface TicketCategoryType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  categoryName: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  tickets: any[];
}