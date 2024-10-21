import fetcher from "../fetcher";

export default function getMovies(query: string | null = null) {
  'server only'
  return fetcher(`/api/movies?${query}`);
}