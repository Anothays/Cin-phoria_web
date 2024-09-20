import MovieDetails from '@/containers/MovieDetailsPage/MovieDetails';
import ProjectionEventsTab from '@/containers/MovieDetailsPage/ProjectionEventsTab';
import fetcher from '@/services/fetcher';
import { MovieType } from '@/types/MovieType';
import styles from './MovieDetails.module.scss';

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const movie = (await fetcher(`/api/movies/${params.id}`)) as MovieType;
  const projectionEvents = movie.projectionEvents;

  return (
    <main className={styles.main}>
      <MovieDetails movie={movie} />
      <ProjectionEventsTab projectionEvents={projectionEvents} />
    </main>
  );
}
