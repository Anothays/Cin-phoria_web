'use client';

import Incrementor from '@/containers/MyReservationPage/Incrementor';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import { useReservationContext } from '@/contexts/ReservationContext';

export default function TicketChoicePage() {
  const { reservation } = useReservationContext();
  const router = useRouter();

  if (!reservation) router.replace('/');
  const limit = reservation!.seats.length;
  const extraCharge = reservation!.projectionEvent.format.extraCharge;

  return (
    <>
      {extraCharge > 0 ? (
        <Alert sx={{ marginTop: '1rem' }} severity="info">
          Projection {reservation!.projectionEvent.format.projectionFormatName} : supplément de{' '}
          {extraCharge / 100} euros sur les tarifs initiaux
        </Alert>
      ) : null}
      <Incrementor extraCharge={extraCharge} limit={limit} reservationId={reservation!.id} />
    </>
  );
}
