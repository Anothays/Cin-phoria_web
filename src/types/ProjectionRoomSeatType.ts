import { HydraMember } from "./ApiResponseType";

export interface ProjectionRoomSeatType extends HydraMember {
  id: number;
  seatRow: string;
  seatNumber: number;
  createdAt: Date;
  updatedAt: Date;
  projectionRoom: string;
  reservations: any[];
  rowAndNumberSeat: string;
  forReducedMobility: boolean;
}