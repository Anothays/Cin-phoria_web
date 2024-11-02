import { HydraMember } from "./ApiResponseType";
import { ProjectionEventType } from "./ProjectionEventType";
import { ProjectionRoomSeatType } from "./ProjectionRoomSeatType";

export interface ProjectionRoomType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  titleRoom: string;
  createdAt: Date;
  updatedAt: Date;
  projectionRoomSeats: ProjectionRoomSeatType[];
  movieTheater: string;
  projectionEvents: ProjectionEventType[]
}