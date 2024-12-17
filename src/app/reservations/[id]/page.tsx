import SeatMap from '@/components/SeatMap';
import styles from './Reservation.module.scss';
import { auth } from '@/auth';
import fetcher from '@/services/fetcher';
import { redirect } from 'next/navigation';

export default async function ReservationPage({ params }: { params: { id: number } }) {
  const session = await auth();
  const response = await fetcher(`/api/reservations/${params.id}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });
  console.log('response.status', response.status);
  if (response.status && response.status === 404) return redirect('/');

  const reservation = response;
  console.log('reservation', reservation.id);
  if (reservation.paid) return redirect('/');

  const currentProjection = reservation.projectionEvent;

  return (
    <div className={styles.container}>
      <h1>
        <p>{currentProjection?.movie.title}</p>
        <p>
          Séance du {currentProjection?.date} à {currentProjection?.beginAt}
        </p>
        <p>
          Cinéma &quot;{currentProjection?.movieTheater.theaterName}&quot; - salle{' '}
          {currentProjection?.projectionRoom.titleRoom}
        </p>
      </h1>
      {currentProjection?.id ? <SeatMap reservation={reservation} /> : null}
    </div>
  );
}
