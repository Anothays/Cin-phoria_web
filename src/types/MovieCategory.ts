import { HydraMember } from "./ApiResponseType";
import { MovieType } from "./MovieType";

export interface MovieCategory extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  categoryName: string;
  movies: MovieType[];
  createdAt: Date;
  updatedAt: Date;
}
