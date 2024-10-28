'use client';

import ReservationCard from '@/components/ReservationCard';
import DenseTable from '@/containers/MyReservationPage/DenseTable';
import fetcher from '@/services/fetcher';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { ReservationType } from '@/types/ReservationType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './MyReservation.module.scss';

export default function MyReservationsPage() {
  const session = useSession();
  const [reservations, setReservations] = useState<ReservationType[] | undefined>(undefined);

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetcher('/api/reservations', {
        headers: {
          Authorization: `Bearer ${session.data?.token}`,
        },
      }).then((res: ApiJSONResponseType) => {
        return setReservations(res['hydra:member'] as ReservationType[]);
      });
    }
  }, [session.status]);

  if (session.status === 'loading') return <p>Chargement...</p>;

  if (session.status === 'authenticated' && reservations) {
    const today = new Date();

    const incomingReservations = reservations.filter(
      (reservation) =>
        new Date(reservation.projectionEvent.date.split('/').reverse().join('-')) > today,
    );
    const reservationOver = reservations.filter(
      (reservation) =>
        new Date(reservation.projectionEvent.date.split('/').reverse().join('-')) < today,
    );
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Mes réservations</h1>

        <h2 className={styles.title}>Mes séances à venir</h2>
        {incomingReservations?.length > 0 ? (
          incomingReservations?.map((reservation) => (
            <ReservationCard reservation={reservation} key={reservation.id} />
          ))
        ) : (
          <p>Pas de réservation actuellement</p>
        )}

        <h2 className={styles.title}>Mes séances passées</h2>
        {/* {reservationOver?.length > 0 ? (
          reservationOver?.map((reservation) => (
            <ReservationCard reservation={reservation} key={reservation.id} />
          ))
        ) : (
          <p>Pas de réservation actuellement</p>
        )} */}
        <DenseTable reservations={reservationOver} />
      </div>
    );
  }
}
