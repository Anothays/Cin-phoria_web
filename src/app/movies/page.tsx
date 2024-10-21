'use client';

import MovieList from '@/containers/MoviesPage/MovieList';
import SearchArea from '@/containers/MoviesPage/SearchArea';
import fetcher from '@/services/fetcher';
import { useMovies } from '@/services/movies';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import styles from './Movies.module.scss';

export default function MoviesPage() {
  const movieData = useMovies();
  const moviesApiData = movieData.data?.['hydra:member'] as MovieType[];
  const [movies, setMovies] = useState<MovieType[]>(moviesApiData);
  const [isLoading, setIsLoading] = useState(false);

  const callbackAction = async (query: string) => {
    setIsLoading(true);
    const response = await fetcher(query);
    if (!response && !response.ok) {
      setIsLoading(false);
      throw new Error('Error during fetching data');
    }
    const data: ApiJSONResponseType = await response.json();
    setMovies(data['hydra:member'] as MovieType[]);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Les films du moment</h1>
      <SearchArea callbackAction={callbackAction} />
      {isLoading ? <CircularProgress color="inherit" size={50} /> : <MovieList movies={movies} />}
    </div>
  );
}
