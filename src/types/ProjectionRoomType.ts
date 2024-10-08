import { HydraMember } from "./ApiResponseType";
import { ProjectionEventType } from "./ProjectionEventType";

export interface ProjectionRoomType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  titleRoom: string;
  createdAt: Date;
  updatedAt: Date;
  projectionRoomSeats: ProjectionRoomType[];
  movieTheater: string;
  projectionEvents: ProjectionEventType[]
}