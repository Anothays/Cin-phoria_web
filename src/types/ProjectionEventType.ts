import { HydraMember } from "./ApiResponseType";
import { MovieTheaterType } from "./MovieTheaterType";
import { ProjectionFormatType } from "./ProjectionFormatType";
import { ProjectionRoomType } from "./ProjectionRoomType";

export interface ProjectionEventType extends HydraMember {
  id: number;
  language: string;
  beginAt: string;
  date: string;
  movie: string;
  projectionRoom: ProjectionRoomType;
  createdAt: Date;
  updatedAt: Date;
  reservations: any[];
  reservedSeats: any[];
  endAt: string;
  movieTheater: MovieTheaterType;
  format: ProjectionFormatType;
}
