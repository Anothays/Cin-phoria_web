import { ReservationType } from '@/types/ReservationType';
import Image from 'next/image';
import styles from './ReservationCard.module.scss';
import Link from 'next/link';

export default function ReservationCard({ reservation }: { reservation: ReservationType }) {
  const projectionEvent = reservation.projectionEvent;
  const movie = projectionEvent.movie;
  return (
    <Link href={`/my_reservations/${reservation.id}`} className={styles.container}>
      <Image
        className={styles.image}
        // src={movie.img}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
        // alt={movie.name}
        alt={`${movie.title}`}
        width={60}
        height={200}
        sizes="100%"
        style={{
          width: 'auto',
          maxHeight: '200px',
        }}
      />
      <div className={styles.infos}>
        <p className={styles.movieTitle}>{movie.title}</p>
        <p>Le {projectionEvent.date}</p>
        <p>à {projectionEvent.beginAt}</p>
        <p>
          <span className={styles.tickets}>{reservation.tickets.length}</span> billets
        </p>
      </div>
    </Link>
  );
}
