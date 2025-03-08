export const revalidate = 0;
export const dynamic = 'force-dynamic';

import SeatMap from '@/components/SeatMap';
import styles from './Reservation.module.scss';
import { auth } from '@/auth';
import fetcher from '@/services/fetcher';
import { redirect } from 'next/navigation';

export default async function ReservationPage({ params }: { params: { id: number } }) {
  const session = await auth();
  const response = await fetcher(`/api/reservations/${params.id}`, {
    headers: { Authorization: `Bearer ${session?.token}` },
  });

  if (response.status && response.status === 404) return redirect('/');

  const reservation = response;
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
      {currentProjection?.id ? <SeatMap /> : null}
    </div>
  );
}
