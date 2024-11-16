import { auth } from '@/auth';
import ReservationCard from '@/components/ReservationCard';
import DenseTable from '@/containers/MyReservationPage/DenseTable';
import fetcher from '@/services/fetcher';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { ReservationType } from '@/types/ReservationType';
import styles from './MyReservation.module.scss';

export default async function MyReservationsPage() {
  const session = await auth();
  const reservations = (await fetcher('/api/reservations', {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  })) as ApiJSONResponseType<ReservationType>;

  const today = new Date();
  const allReservations = reservations['hydra:member'];

  const incomingReservations = allReservations.filter(
    (reservation) =>
      new Date(
        reservation.projectionEvent.date.split('/').reverse().join('-') +
          'T' +
          reservation.projectionEvent.beginAt,
      ) >= today,
  );
  const terminatedReservations = allReservations.filter(
    (reservation) =>
      new Date(
        reservation.projectionEvent.date.split('/').reverse().join('-') +
          'T' +
          reservation.projectionEvent.beginAt,
      ) < today,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vos réservations</h1>

      <h2>À venir</h2>
      {incomingReservations?.length > 0 ? (
        incomingReservations?.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <p>Pas de réservation actuellement</p>
      )}

      <h2>Vos dernières séances</h2>
      {/* {terminatedReservations?.length > 0 ? (
        terminatedReservations?.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <p>Pas de réservation actuellement</p>
      )} */}
      <DenseTable reservations={terminatedReservations} />
    </div>
  );
}
