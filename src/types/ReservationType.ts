import { HydraMember } from "./ApiResponseType";
import { ProjectionEventType } from "./ProjectionEventType";
import { ProjectionRoomSeatType } from "./ProjectionRoomSeatType";
import { TicketType } from "./TicketType";
import { UserType } from "./UserType";

export interface ReservationType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  tickets: TicketType[];
  projectionEvent: ProjectionEventType;
  seats: ProjectionRoomSeatType[];
  paid: boolean;
}
