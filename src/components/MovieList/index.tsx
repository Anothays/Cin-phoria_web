'use client';

import { MovieType } from '@/types/MovieType';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieList.module.scss';

export default function MovieList({ movies }: { movies: MovieType[] }) {
  return (
    <div className={styles.container}>
      {movies?.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <Image
            className={styles.image}
            width={350}
            height={500}
            // fill={true}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
            alt={`Image du film ${movie.title}`}
          />
        </Link>
      ))}
    </div>
    // <Carousel
    //   className={styles.container}
    //   animation={'slide'}
    //   indicators={false}
    //   navButtonsAlwaysInvisible
    // >
    //   {movies?.map((movie) => (
    //     <Link href={`/movies/${movie.id}`} key={movie.id}>
    //       <Image
    //         className={styles.image}
    //         width={500}
    //         height={500}
    //         // fill={true}
    //         src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
    //         alt={`Image du film ${movie.title}`}
    //       />
    //     </Link>
    //   ))}
    // </Carousel>
  );
}
