import { MovieType } from '@/types/MovieType';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieCard.module.scss';

export default function MovieCard(movie: MovieType) {
  console.log('coucou');
  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <Link href={`/movies/${movie.id}`} className={styles.container}>
      <Image
        className={styles.image}
        // src={movie.img}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
        // alt={movie.name}
        alt={`${movie.coverImageName}`}
        width={290}
        height={300}
        sizes="100%"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className={styles.titleAndPriceContainer}>
        <h3 className={styles.text}>{movie.title}</h3>
      </div>
    </Link>
  );
}
