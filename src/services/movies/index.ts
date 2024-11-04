import { ApiJSONResponseType } from "@/types/ApiResponseType";
import useSWR from "swr";

export function useMovies(query: string | null = null) {
  return useSWR<ApiJSONResponseType>(`/api/movies?${query}`);
}

export function useMovie(id: string) {
  return useSWR<ApiJSONResponseType>(`/api/movies/${id}`);
}