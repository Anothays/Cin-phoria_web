import { Button } from '@mui/material';
import styles from './TicketIncrementorRow.module.scss';

type TicketIncrementorRowProps = {
  ticketCategory: string;
  ticketPrice: number;
  index: number;
  ticketCounts: number[];
  onCountChange: (operand: string) => void;
};

export default function TicketIncrementorRow({
  ticketCategory,
  ticketPrice,
  index,
  ticketCounts,
  onCountChange,
}: TicketIncrementorRowProps) {
  const handleClick = (e) => {
    const operand = e.currentTarget.getAttribute('operation');
    onCountChange(operand);
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>{ticketCategory}</span>
      <span className={styles.price}>{(ticketPrice / 100).toFixed(2)} €</span>
      <div className={styles.container}>
        <Button className={styles.button} onClick={handleClick} operation={'-'}>
          -
        </Button>
        <p className={styles.count}>{ticketCounts[index]}</p>
        <Button
          // disabled={isDisabled}
          className={styles.button}
          onClick={handleClick}
          operation={'+'}
        >
          +
        </Button>
      </div>
    </div>
  );
}
