'use client';

import MovieCard from '@/containers/MoviesPage/MovieListWithFilters/MovieCard';
import styles from './MovieList.module.scss';
import { useMovies } from '@/services/movies';
import SearchArea from '@/containers/MoviesPage/SearchArea';
import fetcher from '@/services/fetcher';
import { CircularProgress } from '@mui/material';

export default function MovieListWithFilters() {
  const { data, isLoading, mutate } = useMovies();

  const callbackAction = async (query: string) => {
    try {
      const response = await fetcher(query);
      mutate(response, false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <SearchArea callbackAction={callbackAction} />
      {isLoading ? (
        <CircularProgress color="inherit" size={50} />
      ) : (
        <div className={styles.movieList}>
          {data?.['hydra:member'].map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      )}
    </>
  );
}
