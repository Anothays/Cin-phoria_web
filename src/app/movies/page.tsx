import MovieList from '../../containers/MoviesPage/MovieListWithFilters';
import styles from './Movies.module.scss';

export default function MoviesPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Les films du moment</h1>
      <MovieList />
    </div>
  );
}
