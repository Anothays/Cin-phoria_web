'use client';

import { TicketCategoryType } from '@/types/TicketCategoryType';
import { Button, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import styles from './TicketChoice.module.scss';

type IncrementorPropsType = {
  ticketCategories: TicketCategoryType[];
  limit: number;
  reservationId: number;
};

export default function Incrementor({
  ticketCategories,
  limit,
  reservationId,
}: IncrementorPropsType) {
  const router = useRouter();
  const session = useSession();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsCount, setTicketCount] = useState(
    ticketCategories.map((item) => ({
      id: item.id,
      category: item.categoryName,
      price: item.price,
      count: 0,
    })),
  );

  const total = useMemo(() => {
    return ticketsCount.reduce(
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
    if (limit === total.count) return setButtonDisabled(false);
    return setButtonDisabled(true);
  }, [total]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const categoryId = e.currentTarget.getAttribute('data-id');
    const operator = e.currentTarget.innerText;
    const ticketsCountCopy = [...ticketsCount];
    const itemToUpdate = ticketsCountCopy.find((item) => item.id === +categoryId!);
    if (operator === '+') {
      if (total.count >= limit) return;
    } else if (operator === '-') {
      if (itemToUpdate!.count <= 0) return;
    } else return;
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

  return (
    <div className={styles.container}>
      <p>
        Vous avez sélectionné {limit} siège{limit > 1 ? 's' : ''}
      </p>
      <div className={styles.incrementor}>
        {ticketCategories.map((category, index) => (
          <div className={styles.incrementorRow} key={category.id}>
            <div> {category.categoryName}</div>
            <div> {(category.price / 100).toFixed(2)} €</div>
            <div className={styles.counter}>
              <Button
                className={styles.button}
                onClick={handleClick}
                data-id={ticketsCount[index].id}
              >
                -
              </Button>
              <span className={styles.rowCount}>{ticketsCount[index].count}</span>
              <Button
                className={styles.button}
                onClick={handleClick}
                data-id={ticketsCount[index].id}
              >
                +
              </Button>
            </div>
          </div>
        ))}
        <hr />
        <div className={styles.incrementorFooter}>
          <p className={styles.totalPrice}>{(total.totalPrice / 100).toFixed(2)} €</p>
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
