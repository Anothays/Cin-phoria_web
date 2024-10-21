'use client';

import { MovieType } from '@/types/MovieType';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';
import styles from './MovieList.module.scss';
// import { useMovies } from '@/services/movies';
// import { MovieType } from '@/types/MovieType';

export default function MovieList({ movies }: { movies: MovieType[] }) {
  // const movieData = useMovies();
  // const movies = movieData.data?.['hydra:member'] as MovieType[];

  return (
    <Carousel className={styles.container}>
      {movies?.map((movie) => (
        // <MovieCard key={movie.id} {...movie} />
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <Image
            className={styles.image}
            width={400}
            height={500}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
            alt={`${movie.title}`}
          />
        </Link>
      ))}
    </Carousel>
  );
}
