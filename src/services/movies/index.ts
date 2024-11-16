import { ApiJSONResponseType } from "@/types/ApiResponseType";
import { MovieType } from "@/types/MovieType";
import useSWR from "swr";

export function useMovies(query: string | null = null) {
  return useSWR<ApiJSONResponseType<MovieType>>(`/api/movies?${query}`);
}

export function useMovie(id: string) {
  return useSWR<MovieType>(`/api/movies/${id}`);
}