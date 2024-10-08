'use client';

import { useProjectionEvents } from '@/services/projectionEvents';
import { ProjectionRoomSeatType } from '@/types/ProjectionRoomSeatType';
import { CircularProgress } from '@mui/material';
import Seat from './Seat';
import styles from './SeatMap.module.scss';
import { useSession } from 'next-auth/react';

type SeatMapProps = {
  projectionId: number;
  onSeatSelect: (seatId: number) => void;
};

export default function SeatMap({ projectionId, onSeatSelect }: SeatMapProps) {
  const projectionEvent = useProjectionEvents(projectionId);
  const { data, isLoading } = projectionEvent;

  if (isLoading) return <CircularProgress />;

  if (data) {
    const { allSeats } = data;

    const allSeatsOrdered = {};

    allSeats.forEach((seat) => {
      if (!allSeatsOrdered[seat.seatRow]) allSeatsOrdered[seat.seatRow] = [];
      allSeatsOrdered[seat.seatRow].push(seat);
    });

    return (
      <div className={styles.container}>
        <table>
          <tbody>
            {Object.keys(allSeatsOrdered).map((seatRow) => (
              <tr key={seatRow}>
                {allSeatsOrdered[seatRow].map((seat: ProjectionRoomSeatType) => (
                  <td key={seat.id} className={styles.td}>
                    <Seat
                      seatId={seat.id}
                      isForRedecedMobilityPerson={seat.forReducedMobility}
                      isNotSelectable={!!data.reservedSeats.find((item) => item === seat.id)}
                      onSeatSelect={onSeatSelect}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
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
      </div>
    );
  }
}
