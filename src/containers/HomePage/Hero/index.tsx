'use client';

// import MovieList from '@/components/MovieList';
import { useMovies } from '@/services/movies';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import { getLastWednesday } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';
import styles from './Hero.module.scss';

export default function Hero() {
  const moviesData = useMovies(`createdAt[after]=${getLastWednesday()}`);

  if (moviesData.isLoading) return <p>Chargement...</p>;

  if (moviesData.data) {
    const data = moviesData.data as ApiJSONResponseType;
    const movies = data['hydra:member'] as unknown as MovieType[];

    return (
      <section className={styles.container}>
        <Carousel navButtonsAlwaysInvisible indicators={false}>
          {movies.map((movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <Image
                className={styles.image}
                fill={true}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
                alt={`Image du film ${movie.title}`}
              />
              <Image
                className={styles.image2}
                width={500}
                height={500}
                // fill={true}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
                alt={`Image du film ${movie.title}`}
              />
            </Link>
          ))}
        </Carousel>

        {/* <div className={styles.searchContainer}>
          <SearchArea />
        </div> */}
        {/* <MovieList movies={movies} /> */}
      </section>
    );
  }
}
