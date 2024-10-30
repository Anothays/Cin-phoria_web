import { MovieType } from '@/types/MovieType';
import { dateFormat } from '@/utils/utils';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import styles from './MovieCardDetailed.module.scss';

export default function MovieCardDetailed({ movie }: { movie: MovieType }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
        alt={`${movie.coverImageName}`}
        width={400}
        height={400}
        // sizes="100%"
      />
      <div className={styles.titleAndPriceContainer}>
        <h1 className={styles.mainTitle}>{movie.title}</h1>
        <div>
          <h2 className={styles.title}></h2>
          <span>Sortie le </span>
          {dateFormat(movie.releasedOn)}
        </div>
        <div>
          <span>De</span> {movie.director}
        </div>
        <div>
          <span>Avec</span> {movie.casting.map((el) => `${el}, `)}
        </div>
        <div>
          <span>Synopsis</span>
          <p className={styles.text}>{movie.synopsis}</p>
        </div>
        <div className={styles.rating}>
          <span>Note certifiée : </span>{' '}
          <Rating value={movie.averageNote} readOnly precision={0.5} /> /5
        </div>
      </div>
    </div>
  );
}
