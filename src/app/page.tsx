import MovieList from '@/components/MovieList';
import Hero from '@/containers/HomePage/Hero';
import getMovies from '@/services/movies/lib';
import { MovieType } from '@/types/MovieType';
import styles from './HomePage.module.scss';

export default async function Home() {
  console.log(getLastWednesday());

  const moviesData = await getMovies(`isStaffFavorite=&createdAt[after]=${getLastWednesday()}`);
  const movies = moviesData['hydra:member'] as MovieType[];
  const moviestaffFavorite = movies.filter((movie) => movie.staffFavorite);

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Bienvenue !</h1>
        {/* <SearchArea /> */}
      </div>
      <h2 className={styles.title}>Les dernières sorties de ce mercredi</h2>
      <Hero movies={movies} />
      <h2 className={styles.title}>Nos coups de coeur à l'affiche</h2>
      <MovieList movies={moviestaffFavorite} />
    </div>
  );
}

// récupérer la date du dernier mercredi
function getLastWednesday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  console.log(dayOfWeek);

  const lastWednesday = new Date();
  lastWednesday.setDate(today.getDate() - ((dayOfWeek + 4) % 7));
  return lastWednesday.toISOString().split('T')[0]; // Format 'YYYY-MM-DD'
}
