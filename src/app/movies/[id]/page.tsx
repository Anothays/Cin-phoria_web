import MovieComments from '@/containers/MovieDetailsPage/MovieComments';
import MovieDetails from '@/containers/MovieDetailsPage/MovieDetails';
import ProjectionEventsTab from '@/containers/MovieDetailsPage/ProjectionEventsTab';
import fetcher from '@/services/fetcher';
import styles from './MovieDetails.module.scss';

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const movie = await fetcher(`/api/movies/${params.id}`, { cache: 'no-store' });
  const projectionEvents = movie.projectionEvents;
  console.log('movie ==> ', movie);

  return (
    <main className={styles.main}>
      <MovieDetails movie={movie} />
      <ProjectionEventsTab projectionEvents={projectionEvents} />
      <MovieComments comments={movie.comments} />
    </main>
  );
}
