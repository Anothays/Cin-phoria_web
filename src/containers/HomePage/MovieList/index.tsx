'use client';

import MovieCard from '@/components/MovieCard';
import { useMovies } from '@/services/movies';
import { MovieType } from '@/types/MovieType';
import styles from './MovieList.module.scss';

export default function MovieList() {
  const movieData = useMovies();
  const movies = movieData.data?.['hydra:member'] as MovieType[];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Les films du moment</h2>
      <div className={styles.movieList}>
        {movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
    </section>
  );
}
