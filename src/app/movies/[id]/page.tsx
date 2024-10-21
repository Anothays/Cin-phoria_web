import MovieDetails from '@/containers/MovieDetailsPage/MovieDetails';
import ProjectionEventsTab from '@/containers/MovieDetailsPage/ProjectionEventsTab';
import fetcher from '@/services/fetcher';
import styles from './MovieDetails.module.scss';

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const response = await fetcher(`/api/movies/${params.id}`);
  const movie = await response.json();
  const projectionEvents = movie.projectionEvents;

  return (
    <main className={styles.main}>
      <MovieDetails movie={movie} />
      <ProjectionEventsTab projectionEvents={projectionEvents} />
    </main>
  );
}
