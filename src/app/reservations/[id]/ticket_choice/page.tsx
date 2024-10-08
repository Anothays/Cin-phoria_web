'use client';

import TicketIncrementor from '@/containers/ReservationPage/TicketIncrementor';
import fetcher from '@/services/fetcher';
import { useTicketCategories } from '@/services/Tarifs';
import { ReservationType } from '@/types/ReservationType';
import { TicketCategoryType } from '@/types/TicketCategoryType';
import ArrowForwardIcon from '@mui/material/Icon';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './TicketChoice.module.scss';

export default function TicketChoicePage({ params }: { params: { id: number } }) {
  const { status, data } = useSession();
  const router = useRouter();
  const ticketCategories = useTicketCategories();
  const [currentReservation, setCurrentReservation] = useState<ReservationType | undefined>(
    undefined,
  );

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
      setCurrentReservation(res);
    });
  }, [status]);

  const handleclick = async (e) => {
    e.preventDefault();

    const body = {
      tickets: JSON.parse(localStorage.getItem('ticketCategoryChoices') ?? ''),
      reservationId: currentReservation?.id,
    };
    console.log(JSON.stringify(body));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log(response);
    if (response.status === 410) {
      const data = await response.json();
      console.log(data);
      alert(data.message);
      router.replace('/');
      return;
    }
    const { url } = await response.json();
    router.replace(url);
  };

  if (currentReservation && ticketCategories.data) {
    // console.log('currentReservation', currentReservation);

    return (
      <div className={styles.container}>
        <TicketIncrementor
          limit={currentReservation.seats.length}
          ticketCategories={ticketCategories.data['hydra:member'] as TicketCategoryType[]}
        />
        <div>
          <Link
            className={styles.seatingConfirmationSection}
            // href={`${process.env.NEXT_PUBLIC_BASE_URL}/checkout`}
            href={''}
            onClick={handleclick}
          >
            Accéder au paiment <ArrowForwardIcon />
          </Link>
        </div>
      </div>
    );
  }

  return <p>Chargement...</p>;
}
