import { ApiJSONResponseType } from "@/types/ApiResponseType";
import useSWR from "swr";


export function useMovieTheater() {
  return useSWR<ApiJSONResponseType>('/api/movie_theaters');
}