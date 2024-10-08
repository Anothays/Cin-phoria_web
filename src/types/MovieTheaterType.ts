import { HydraMember } from "./ApiResponseType";
import { ProjectionEventType } from "./ProjectionEventType";

export interface MovieTheaterType extends HydraMember {
  "@id": string;
  "@type": string;
  "@context": string;
  id: number;
  theaterName: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  projectionRooms: string[];
  projectionEvents: ProjectionEventType[];
}
