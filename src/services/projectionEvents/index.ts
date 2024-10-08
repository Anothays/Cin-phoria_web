import { ProjectionEventType } from "@/types/ProjectionEventType";
import useSWR from "swr";


export function useProjectionEvents(id: number) {
  return useSWR<ProjectionEventType>(`/api/projection_events/${id}`);
}