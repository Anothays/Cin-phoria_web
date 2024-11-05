'use client';

import TicketList from '@/containers/MyReservationPage/TicketList';
import fetcher from '@/services/fetcher';
import { ReservationType } from '@/types/ReservationType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './Reservation.module.scss';

export default function ReservationPage({ params }: { params: { id: number } }) {
  const session = useSession();
  const [reservation, setReservation] = useState<ReservationType | undefined>(undefined);

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetcher(`/api/reservations/${params.id}`, {
        headers: {
          Authorization: `Bearer ${session.data?.token}`,
        },
      }).then((data) => {
        setReservation(data);
      });
    }
  }, [session?.status]);

  if (reservation === undefined) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vos billets pour la séance</h1>
      <TicketList reservation={reservation} />
    </div>
  );
}
