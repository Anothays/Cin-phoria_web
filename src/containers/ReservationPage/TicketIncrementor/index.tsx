import { TicketCategoryType } from '@/types/TicketCategoryType';
import { useEffect, useState } from 'react';
import styles from './TicketIncrementor.module.scss';
import TicketIncrementorRow from './TicketIncrementorRow';

type TicketIncrementorProps = {
  limit: number;
  ticketCategories: TicketCategoryType[];
};

export default function TicketIncrementor({ limit, ticketCategories }: TicketIncrementorProps) {
  const [ticketCounts, setTicketCounts] = useState<number[]>(ticketCategories.map(() => 0));
  const [totalPrice, setTotalPrice] = useState(0);

  const handleUpdateCount = (operand: string, index: number) => {
    const ticketCountsCopy = [...ticketCounts];
    const totalCount = ticketCountsCopy.reduce((acc, current) => acc + current, 0);
    switch (operand) {
      case '-':
        if (ticketCountsCopy[index] <= 0) {
          ticketCountsCopy[index] = 0;
          break;
        } else {
          ticketCountsCopy[index] -= 1;
          break;
        }
      case '+':
        if (totalCount >= limit) break;
        ticketCountsCopy[index] += 1;
        break;

      default:
        break;
    }
    setTicketCounts(ticketCountsCopy);
  };

  const storeIntoLocalStorage = (ticketCategories: TicketCategoryType[]) => {
    const data: { category: string; count: number }[] = [];
    ticketCategories.forEach((category, index) => {
      data.push({ category: category.categoryName, count: ticketCounts[index] });
    });
    localStorage.setItem('ticketCategoryChoices', JSON.stringify(data));
  };

  useEffect(() => {
    setTotalPrice(() => {
      console.log('ticketCounts ==>', ticketCounts);
      let total = 0;
      ticketCounts.forEach((count, index) => {
        total += count * ticketCategories[index].price;
      });
      return total;
    });
    storeIntoLocalStorage(ticketCategories);
  }, [ticketCounts]);

  return (
    <div className={styles.container}>
      {ticketCategories.map((category, index) => (
        <TicketIncrementorRow
          ticketCategory={category.categoryName}
          ticketPrice={category.price}
          index={index}
          ticketCounts={ticketCounts}
          onCountChange={(operand) => handleUpdateCount(operand, index)}
          key={category.id}
        />
      ))}
      <hr />
      <p className={styles.totalPrice}>{(totalPrice / 100).toFixed(2)} €</p>
    </div>
  );
}
