import { HydraMember } from "./ApiResponseType";

export interface ProjectionFormatType extends HydraMember {
  id: number;
  projectionFormatName: string;
  createdAt: Date;
  updatedAt: Date;
  extraCharge: number;
  projectionEvents: string[];
}
