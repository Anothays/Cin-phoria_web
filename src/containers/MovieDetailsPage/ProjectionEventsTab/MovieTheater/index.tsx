import { MovieTheaterType } from '@/types/MovieTheaterType';
import Image from 'next/image';
import styles from './MovieTheater.module.scss';

export default function MovieTheater(movieTheater: MovieTheaterType) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3> Cinéphoria - {movieTheater.theaterName}</h3>
        <p>Forum des Halles - Niveau -3 75001 PARIS</p>
      </div>
      <Image
        className={styles.image}
        src={'https://www.ugc.fr/dynamique/images/visuelcinema/les-halles_264x198.jpg'}
        alt="movieTheater"
        width={200}
        height={200}
      />
    </div>
  );
}
