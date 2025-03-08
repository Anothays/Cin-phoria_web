import MovieComments from '@/containers/MovieDetailsPage/MovieComments';
import MovieDetails from '@/containers/MovieDetailsPage/MovieDetails';
import ProjectionEventsTab from '@/containers/MovieDetailsPage/ProjectionEventsTab';
import styles from './MovieDetails.module.scss';
import ReservationModal from '@/containers/MovieDetailsPage/ReservationModal';
import { ReservationModalContextHandler } from '@/context/ReservationModalContext';

export default async function MovieDetail({ params }: { params: { id: string } }) {
  return (
    <main className={styles.main}>
      <ReservationModalContextHandler movieId={params.id}>
        <MovieDetails />
        <ProjectionEventsTab />
        <MovieComments />
        <ReservationModal />
      </ReservationModalContextHandler>
    </main>
  );
}
