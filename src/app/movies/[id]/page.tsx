import MovieComments from '@/containers/MovieDetailsPage/MovieComments';
import MovieDetails from '@/containers/MovieDetailsPage/MovieDetails';
import ProjectionEventsTab from '@/containers/MovieDetailsPage/ProjectionEventsTab';
import fetcher from '@/services/fetcher';
import styles from './MovieDetails.module.scss';
import { MovieType } from '@/types/MovieType';

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const movie = (await fetcher(`/api/movies/${params.id}`, { cache: 'no-store' })) as MovieType;
  const projectionEvents = movie.projectionEventsSortedByDateAndGroupedByTheater;

  return (
    <main className={styles.main}>
      <MovieDetails movie={movie} />
      <ProjectionEventsTab projectionEvents={projectionEvents} />
      <MovieComments comments={movie.comments} />
    </main>
  );
}
