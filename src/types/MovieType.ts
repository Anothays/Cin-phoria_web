import { HydraMember } from "./ApiResponseType";
import { ProjectionEventType } from "./ProjectionEventType";

export interface MovieType extends HydraMember {
  id: number;
  title: string;
  director: string;
  synopsis: string;
  casting: string[];
  releasedOn: Date;
  posters: any[];
  minimumAge: number;
  notesTotalPoints: number;
  noteTotalVotes: number;
  averageNote: number;
  movieCategories: string[];
  projectionEvents: ProjectionEventType[];
  durationInMinutes: number;
  staffFavorite: boolean;
  coverImageName: string;
  createdAt: Date;
  updatedAt: Date;
}
