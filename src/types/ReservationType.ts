import { HydraMember } from "./ApiResponseType";

export interface ReservationType extends HydraMember {
  id: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  tickets: string[];
  projectionEvent: string;
  seats: string[];
  paid: boolean;
}
