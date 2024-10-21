import TicketCard from '@/containers/MyReservationPage/TicketList/TicketCard';
import { ReservationType } from '@/types/ReservationType';
import styles from './TicketList.module.scss';

export default function TicketList({ reservation }: { reservation: ReservationType }) {
  return (
    <ul className={styles.container}>
      {reservation?.tickets.map((ticket) => (
        <TicketCard key={ticket['@id']} reservation={reservation} uniqueCode={ticket.uniqueCode} />
      ))}
    </ul>
  );
}
