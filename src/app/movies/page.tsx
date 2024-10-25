'use client';

import MovieList from '@/containers/MoviesPage/MovieList';
import SearchArea from '@/containers/MoviesPage/SearchArea';
import fetcher from '@/services/fetcher';
import { useMovies } from '@/services/movies';
import { MovieType } from '@/types/MovieType';
import { CircularProgress } from '@mui/material';
import styles from './Movies.module.scss';

export default function MoviesPage() {
  const movieData = useMovies();
  const { data, isLoading, mutate } = movieData;

  const callbackAction = async (query: string) => {
    try {
      const response = await fetcher(query);
      console.log('response ==> ', response);
      console.log('data ==> ', data);

      mutate(response, false);
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Les films du moment</h1>
        <SearchArea callbackAction={callbackAction} />
        <CircularProgress color="inherit" size={50} />
      </div>
    );
  }

  if (data) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Les films du moment</h1>
        <SearchArea callbackAction={callbackAction} />
        <MovieList movies={data?.['hydra:member'] as MovieType[]} />
      </div>
    );
  }
}
