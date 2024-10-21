import Hero from '@/containers/HomePage/Hero';
import MovieList from '@/containers/HomePage/MovieList';
import getMovies from '@/services/movies/lib';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import styles from './HomePage.module.scss';

export default async function Home() {
  const response = await getMovies('isStaffFavorite=true');
  const moviesData: ApiJSONResponseType = await response.json();
  console.log('moviesData', moviesData);

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
