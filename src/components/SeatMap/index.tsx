'use client';

import { ProjectionRoomSeatType } from '@/types/ProjectionRoomSeatType';
import { Button, CircularProgress } from '@mui/material';
import Seat from './Seat';
import styles from './SeatMap.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useReservationContext } from '@/contexts/ReservationContext';

export default function SeatMap() {
  const router = useRouter();
  const { reservation, setReservation } = useReservationContext();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const projectionEvent = reservation!.projectionEvent;

  useEffect(() => {
    if (selectedSeats.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedSeats]);

  const onSeatSelect = useCallback((seatId: number) => {
    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seatId)
          ? prevSelectedSeats.filter((id) => id !== seatId) // Désélection
          : [...prevSelectedSeats, seatId], // Sélection
    );
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (selectedSeats.length <= 0) return alert('Vous devez choisir au moins une place');
    setIsLoading(true);
    const body = {
      seats: selectedSeats.map((seatId) => `/api/projection_room_seats/${seatId}`),
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/${reservation!.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: `Bearer ${session.data?.token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.detail);
        return router.replace(`/`);
      }
      setReservation(data);
      return router.push(`/reservations/${reservation!.id}/ticket_choice`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const seatsList = useMemo(() => {
    const { allSeats } = projectionEvent;
    const allSeatsOrdered: { [key: string]: ProjectionRoomSeatType[] } = {};
    allSeats.forEach((seat) => {
      if (!(seat.seatRow in allSeatsOrdered)) allSeatsOrdered[seat.seatRow] = [];
      allSeatsOrdered[seat.seatRow].push(seat);
    });
    return Object.keys(allSeatsOrdered).map((seatRow) => (
      <tr key={seatRow}>
        {allSeatsOrdered[seatRow].map((seat: ProjectionRoomSeatType) => (
          <td key={seat.id} className={styles.td}>
            <Seat
              seatId={seat.id}
              isForRedecedMobilityPerson={seat.forReducedMobility}
              isNotSelectable={!!projectionEvent.reservedSeats.find((item) => item === seat.id)}
              onSeatSelect={onSeatSelect}
            />
          </td>
        ))}
      </tr>
    ));
  }, [projectionEvent.reservedSeats, onSeatSelect]);

  return (
    <div className={styles.container}>
      <table>
        <tbody>{seatsList}</tbody>
      </table>
      <div className={styles.screen}>
        <p>Écran</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 16" preserveAspectRatio="none">
          <path
            d="M2.66184176,17.0420609 C61.4044988,10.0643402 160.517218,6.57547986 300,6.57547986 C440.236249,6.57547986 539.332515,10.0608704 597.288798,17.0316515 L597.288801,17.0316296 C598.61685,17.1913628 599.822936,16.2442555 599.982669,14.9162062 C599.994213,14.820231 600,14.7236507 600,14.6269838 L600,14.6269838 C600,13.0582716 598.83353,11.7342804 597.277319,11.53663 C541.970343,4.51220104 442.877902,1 300,1 C157.078283,1 57.9688856,4.54706998 2.67180826,11.6412099 L2.67180649,11.6411962 C1.14418888,11.8371764 2.55476753e-16,13.1375324 4.4408921e-16,14.67767 L0,14.67767 C1.61039058e-16,15.9926537 1.06600492,17.0586586 2.38098862,17.0586586 C2.47485117,17.0586586 2.56863159,17.0531082 2.66183888,17.0420367 Z"
            id="Shape"
            fill="#757575"
            fillRule="nonzero"
            transform="translate(300.000000, 9.000000) scale(1, -1) translate(-300.000000, -9.000000) "
          ></path>
        </svg>
      </div>
      <Button
        disabled={buttonDisabled}
        className={buttonDisabled ? styles.submitButtonDisabled : styles.submitButtonEnabled}
        href={''}
        onClick={handleClick}
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Réserver ma place'}
      </Button>
    </div>
  );
}
