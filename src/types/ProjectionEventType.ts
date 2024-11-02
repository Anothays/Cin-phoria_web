import { HydraMember } from "./ApiResponseType";
import { MovieTheaterType } from "./MovieTheaterType";
import { MovieType } from "./MovieType";
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
  createdAt: Date;
  updatedAt: Date;
  reservedSeats: number[];
  endAt: string;
  seatsForReducedMobility: boolean;
  movie: MovieType;
  projectionRoom: ProjectionRoomType;
  reservations: ReservationType[];
  allSeats: ProjectionRoomSeatType[];
  movieTheater: MovieTheaterType;
  format: ProjectionFormatType;
}
