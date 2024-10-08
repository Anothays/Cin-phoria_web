'use client';

import SeatMap from '@/components/SeatMap';
import fetcher from '@/services/fetcher';
import { ProjectionEventType } from '@/types/ProjectionEventType';
import { ReservationType } from '@/types/ReservationType';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Reservation.module.scss';

export default function ReservationPage({ params }: { params: { id: number } }) {
  const { status, data } = useSession();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [currentReservation, setCurrentReservation] = useState<ReservationType | undefined>(
    undefined,
  );
  const [currentProjection, setCurrentProjection] = useState<ProjectionEventType | undefined>(
    undefined,
  );

  const handleSeatSelect = (seatId: number) => {
    console.log('handleSeatSelect');

    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seatId)
          ? prevSelectedSeats.filter((id) => id !== seatId) // Désélection
          : [...prevSelectedSeats, seatId], // Sélection
    );
    console.log(selectedSeats);
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const body = {
      seats: selectedSeats.map((seatId) => `/api/projection_room_seats/${seatId}`),
    };
    const response = await fetcher(`/api/reservations/${currentReservation?.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/merge-patch+json',
        Authorization: `Bearer ${data?.token}`,
      },
    });
    console.log('response ==> ', response);

    // setCurrentReservation(response);
    router.push(`/reservations/${params.id}/ticket_choice`);
  };

  useEffect(() => {
    const getReservation = async () => {
      if (data?.token) {
        return await fetcher(`/api/reservations/${params.id}`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
      }
    };
    getReservation().then((res) => {
      console.log('RESERVATION ==> ', res);
      setCurrentReservation(res);
    });
  }, [status]);

  useEffect(() => {
    if (currentReservation?.projectionEvent)
      setCurrentProjection(currentReservation.projectionEvent);
  }, [currentReservation?.projectionEvent]);

  return (
    <div className={styles.container}>
      <h1>Projection event {currentProjection?.id}</h1>
      {currentProjection?.id ? (
        <SeatMap projectionId={currentProjection?.id} onSeatSelect={handleSeatSelect} />
      ) : null}

      <Link className={styles.seatingConfirmationSection} href={''} onClick={handleClick}>
        Réserver ma place
      </Link>
      <Button
        onClick={() => {
          console.log(selectedSeats);
        }}
      >
        Get selectedSeats
      </Button>
    </div>
  );
}
