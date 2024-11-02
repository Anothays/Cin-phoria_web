import { auth } from '@/auth';
import Incrementor from '@/containers/MyReservationPage/Incrementor';
import fetcher from '@/services/fetcher';
import getTarifs from '@/services/Tarifs/lib';
import { ApiJSONResponseType } from '@/types/ApiResponseType';

import { ReservationType } from '@/types/ReservationType';
import { TicketCategoryType } from '@/types/TicketCategoryType';
import { redirect } from 'next/navigation';

export default async function TicketChoicePage({ params }: { params: { id: number } }) {
  const session = await auth();

  if (!session) redirect('/');

  const reservation = (await fetcher(`/api/reservations/${params.id}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  })) as ReservationType;

  const limit = reservation.seats.length;
  const categories = (await getTarifs()) as ApiJSONResponseType;
  const tariffs = categories['hydra:member'] as TicketCategoryType[];
  const extraCharge = reservation.projectionEvent.format.extraCharge;
  tariffs.forEach((tariff) => {
    tariff.price += extraCharge ?? 0;
  });

  return (
    <>
      <Incrementor
        ticketCategories={categories['hydra:member'] as TicketCategoryType[]}
        limit={limit}
        reservationId={reservation.id}
      />
    </>
  );
}
