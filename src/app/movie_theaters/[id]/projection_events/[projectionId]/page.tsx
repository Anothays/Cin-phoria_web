'use client';

import SeatMap from '@/components/SeatMap';
import fetcher from '@/services/fetcher';
import { ReservationType } from '@/types/ReservationType';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './ProjectionEventPage.module.scss';

export default function ProjectionEventPage({ params }: { params: { projectionId: number } }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); // Etat pour les sièges sélectionnés
  const [currentReservation, setCurrentReservation] = useState<ReservationType | null>(null);

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seatId)
          ? prevSelectedSeats.filter((id) => id !== seatId) // Désélection
          : [...prevSelectedSeats, seatId], // Sélection
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // const reservation = useProjectionEvent(currentReservation?.id);

    const body = {
      seats: selectedSeats.map((seatId) => `/api/projection_room_seats/${seatId}`),
    };

    console.log(body);

    const response = await fetcher(`/api/reservations/${currentReservation?.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/ld+json',
        Authorization: `Bearer ${data?.token}`,
      },
    });
    console.log(response);

    setCurrentReservation(response);
  };

  useEffect(() => {
    const createNewReservation = async () => {
      if (status === 'authenticated') {
        const body = {
          user: data?.user['@id'],
          projectionEvent: `/api/projection_events/${params.projectionId}`,
        };
        const response = await fetcher('/api/reservations', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/ld+json',
            Authorization: `Bearer ${data?.token}`,
          },
        });
        // console.log('response ==> ', response);
        setCurrentReservation(response);
      } else if (status === 'unauthenticated') {
        router.replace('/');
      }
    };

    createNewReservation().then((res) => console.log(res));
  }, [status]);

  return (
    <div className={styles.container}>
      <h1>Projection event {params.projectionId}</h1>
      <SeatMap projectionId={params.projectionId} onSeatSelect={handleSeatSelect} />
      <Link className={styles.seatingConfirmationSection} href={''} onClick={handleClick}>
        <span>Réserver ma place</span> <ArrowForwardIcon />
      </Link>
    </div>
  );
}
