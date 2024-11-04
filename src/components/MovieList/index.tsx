'use client';

import { useMovies } from '@/services/movies';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import { getLastWednesday } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieList.module.scss';

export default function MovieList() {
  const moviesData = useMovies(`isStaffFavorite=&createdAt[after]=${getLastWednesday()}`);

  if (moviesData.isLoading) return <p>Chargement...</p>;

  if (moviesData.data) {
    const data = moviesData.data as ApiJSONResponseType;
    const movies = data['hydra:member'] as unknown as MovieType[];

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
}
