import { auth } from '@/auth';
import Incrementor from '@/containers/MyReservationPage/Incrementor';
import fetcher from '@/services/fetcher';
import getTarifs from '@/services/Tarifs/lib';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { TicketCategoryType } from '@/types/TicketCategoryType';
import { redirect } from 'next/navigation';
import Alert from '@mui/material/Alert';

export default async function TicketChoicePage({ params }: { params: { id: number } }) {
  const session = await auth();

  if (!session) redirect('/');

  const reservation = await fetcher(`/api/reservations/${params.id}`, {
    headers: { Authorization: `Bearer ${session?.token}` },
  });

  if (reservation.status && reservation.status === 404) redirect('/');

  const limit = reservation.seats.length;
  const categories = (await getTarifs()) as ApiJSONResponseType<TicketCategoryType>;
  const extraCharge = reservation.projectionEvent.format.extraCharge;
  categories['hydra:member'].forEach((tariff) => {
    tariff.price += extraCharge ?? 0;
  });

  return (
    <>
      {extraCharge > 0 ? (
        <Alert sx={{ marginTop: '1rem' }} severity="info">
          Projection {reservation.projectionEvent.format.projectionFormatName} : supplément de{' '}
          {extraCharge / 100} euros sur les tarifs initiaux
        </Alert>
      ) : null}
      <Incrementor
        ticketCategories={categories['hydra:member'] as TicketCategoryType[]}
        limit={limit}
        reservationId={reservation.id}
      />
    </>
  );
}
