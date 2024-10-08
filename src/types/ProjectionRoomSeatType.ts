import { HydraMember } from "./ApiResponseType";
import { ReservationType } from "./ReservationType";

export interface ProjectionRoomSeatType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  seatRow: string;
  seatNumber: number;
  createdAt: Date;
  updatedAt: Date;
  projectionRoom: string;
  reservations: ReservationType[];
  rowAndNumberSeat: string;
  forReducedMobility: boolean;
}