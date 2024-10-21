import MovieCard from '@/containers/MoviesPage/MovieList/MovieCard';
import { MovieType } from '@/types/MovieType';
import styles from './MovieList.module.scss';

export default function MovieList({ movies }: { movies: MovieType[] }) {
  return (
    <div className={styles.movieList}>
      {movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)}
    </div>
  );
}
