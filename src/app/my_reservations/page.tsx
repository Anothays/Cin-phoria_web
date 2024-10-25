'use client';

import ReservationCard from '@/components/ReservationCard';
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
      }).then((res: ApiJSONResponseType) =>
        setReservations(res['hydra:member'] as ReservationType[]),
      );
    }
  }, [session.status]);

  if (session.status === 'loading') return <p>Chargement...</p>;

  if (session.status === 'authenticated' && reservations) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Mes réservations</h1>
        <div>
          {reservations?.length > 0 ? (
            reservations?.map((reservation) => (
              <ReservationCard reservation={reservation} key={reservation.id} />
            ))
          ) : (
            <p>Pas de réservation actuellement</p>
          )}
        </div>
      </div>
    );
  }
}
