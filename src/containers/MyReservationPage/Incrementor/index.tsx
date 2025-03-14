'use client';

import { TicketCategoryType } from '@/types/TicketCategoryType';
import { Button, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import styles from './TicketChoice.module.scss';
import getTarifs from '@/services/Tarifs/lib';
import { ApiJSONResponseType } from '@/types/ApiResponseType';

type IncrementorPropsType = {
  limit: number;
  reservationId: number;
  extraCharge: number;
};

type CategoryType = {
  id: number;
  category: string;
  price: number;
  count: number;
};

export default function Incrementor({ limit, reservationId, extraCharge }: IncrementorPropsType) {
  const router = useRouter();
  const session = useSession();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsCount, setTicketCount] = useState<CategoryType[] | undefined>(undefined);

  const total = useMemo(() => {
    return ticketsCount?.reduce(
      (acc, curr) => ({
        totalPrice: acc.totalPrice + curr.price * curr.count,
        count: acc.count + curr.count,
      }),
      {
        totalPrice: 0,
        count: 0,
      },
    );
  }, [ticketsCount]);

  useEffect(() => {
    getTarifs().then((res: ApiJSONResponseType<TicketCategoryType>) => {
      setTicketCount(
        res['hydra:member'].map((category) => ({
          id: category.id,
          category: category.categoryName,
          price: category.price + (extraCharge ?? 0),
          count: 0,
        })),
      );
    });
  }, []);

  useEffect(() => {
    if (limit === total?.count) return setButtonDisabled(false);
    return setButtonDisabled(true);
  }, [limit, total]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const categoryId = e.currentTarget.getAttribute('data-id');
    const operator = e.currentTarget.getAttribute('data-operator');
    const ticketsCountCopy = [...ticketsCount!];
    const itemToUpdate = ticketsCountCopy.find((item) => item.id === +categoryId!);
    if (operator === '+') {
      if (total!.count >= limit) return;
    } else if (operator === '-') {
      if (itemToUpdate!.count <= 0) return;
    } else {
      return;
    }
    itemToUpdate!.count += operator === '+' ? 1 : -1;
    setTicketCount(ticketsCountCopy);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const body = { tickets: ticketsCount };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/checkout/${reservationId}`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/ld+json',
            Authorization: `Bearer ${session.data?.token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return; // A ELNEVER
        router.replace('/');
        return;
      }
      const { url } = await response.json();
      router.replace(url);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (!ticketsCount) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <p>
        Vous avez sélectionné {limit} siège{limit > 1 ? 's' : ''}
      </p>
      <div className={styles.incrementor}>
        {ticketsCount?.map((category, index) => (
          <div className={styles.incrementorRow} key={category.id}>
            <div> {category.category}</div>
            <div> {(category.price / 100).toFixed(2)} €</div>
            <div className={styles.counter}>
              <Button
                className={styles.button}
                onClick={handleClick}
                data-id={ticketsCount![index].id}
                data-operator="-"
              >
                -
              </Button>
              <span className={styles.rowCount}>{ticketsCount![index].count}</span>
              <Button
                className={styles.button}
                onClick={handleClick}
                data-id={ticketsCount![index].id}
                data-operator="+"
              >
                +
              </Button>
            </div>
          </div>
        ))}
        <hr />
        <div className={styles.incrementorFooter}>
          <p className={styles.totalPrice}>{(total!.totalPrice / 100).toFixed(2)} €</p>
        </div>
      </div>

      <Button
        className={buttonDisabled ? styles.submitButtonDisabled : styles.submitButtonEnabled}
        onClick={handleSubmit}
        disabled={buttonDisabled}
      >
        {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Accéder au paiement'}
      </Button>
    </div>
  );
}
