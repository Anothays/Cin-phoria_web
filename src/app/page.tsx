import Hero from '@/containers/HomePage/Hero';
import MovieList from '@/containers/HomePage/MovieList';
import getMovies from '@/services/movies/lib';
import { MovieType } from '@/types/MovieType';
import styles from './HomePage.module.scss';

export default async function Home() {
  const moviesData = await getMovies('isStaffFavorite=true');
  const movies = moviesData['hydra:member'] as MovieType[];

  return (
    <div className={styles.page}>
      <Hero />
      <h2 className={styles.title}>Notre sélection</h2>
      <section className={styles.movieList}>
        <MovieList movies={movies} />
      </section>
    </div>
  );
}
