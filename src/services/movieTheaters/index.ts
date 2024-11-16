import { ApiJSONResponseType } from "@/types/ApiResponseType";
import { MovieTheaterType } from "@/types/MovieTheaterType";
import useSWR from "swr";


export function useMovieTheater() {
  return useSWR<ApiJSONResponseType<MovieTheaterType>>('/api/movie_theaters');
}