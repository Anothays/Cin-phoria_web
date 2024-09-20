import { ApiJSONResponseType } from "@/types/ApiResponseType";
import useSWR from "swr";

export function useMovies() {
  return useSWR<ApiJSONResponseType>('/api/movies');
}

export function useMovie(id: string) {
  return useSWR<ApiJSONResponseType>(`/api/movies/${id}`);
}