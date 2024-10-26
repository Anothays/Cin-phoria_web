import MovieList from '@/components/MovieList';
import SearchArea from '@/components/SearchArea';
import Hero from '@/containers/HomePage/Hero';
import getMovies from '@/services/movies/lib';
import { MovieType } from '@/types/MovieType';
import styles from './HomePage.module.scss';

export default async function Home() {
  const moviesData = await getMovies('isStaffFavorite=true');
  const movies = moviesData['hydra:member'] as MovieType[];
  const moviestaffFavorite = movies.filter((movie) => movie.staffFavorite);

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <SearchArea />
      </div>

      <Hero movies={movies} />
      <h2 className={styles.title}>Nos coups de coeur à l'affiche</h2>
      <MovieList movies={moviestaffFavorite} />
    </div>
  );
}
