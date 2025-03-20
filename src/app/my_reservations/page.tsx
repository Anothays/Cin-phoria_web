import { auth } from '@/auth';
import ReservationCard from '@/components/ReservationCard';
import UserSettings from '@/components/UserSettings';
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
  console.log(typeof session?.userInfos?.createdAt);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Votre espace</h1>

      <h2>Vos séances à venir</h2>
      {incomingReservations?.length > 0 ? (
        incomingReservations?.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <p>Pas de réservation actuellement</p>
      )}

      <section className={styles.terminatedReservations}>
        <h2>Vos dernières séances</h2>
        <DenseTable reservations={terminatedReservations} />
      </section>

      {session?.userInfos && session?.token ? (
        <div className={styles.userSettings}>
          <h2>Vos informations personnelles</h2>
          <UserSettings userInfos={session?.userInfos} token={session?.token} />
        </div>
      ) : null}
    </div>
  );
}
