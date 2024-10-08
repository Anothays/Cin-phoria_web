import { HydraMember } from "./ApiResponseType";
import { MovieTheaterType } from "./MovieTheaterType";
import { ProjectionFormatType } from "./ProjectionFormatType";
import { ProjectionRoomSeatType } from "./ProjectionRoomSeatType";
import { ProjectionRoomType } from "./ProjectionRoomType";
import { ReservationType } from "./ReservationType";

export interface ProjectionEventType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  language: string;
  beginAt: string;
  date: string;
  movie: string;
  projectionRoom: ProjectionRoomType;
  createdAt: Date;
  updatedAt: Date;
  reservations: ReservationType[];
  allSeats: ProjectionRoomSeatType[];
  reservedSeats: number[];
  endAt: string;
  movieTheater: MovieTheaterType;
  format: ProjectionFormatType;
}
