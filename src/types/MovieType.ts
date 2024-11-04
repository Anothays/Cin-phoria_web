import { HydraMember } from "./ApiResponseType";
import { CommentType } from "./CommentType";
import { ProjectionEventType } from "./ProjectionEventType";

export interface MovieType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  title: string;
  director: string;
  synopsis: string;
  casting: string[];
  releasedOn: Date;
  posters: unknown[];
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
  comments: CommentType[];
}
