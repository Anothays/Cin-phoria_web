'use client';

// import MovieList from '@/components/MovieList';
import { useMovies } from '@/services/movies';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import { getLastWednesday } from '@/utils/utils';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-material-ui-carousel';
import styles from './Hero.module.scss';

export default function Hero() {
  const moviesData = useMovies(`createdAt[after]=${getLastWednesday()}`);

  if (moviesData.isLoading) return <CircularProgress size={60} sx={{ marginY: '17rem' }} />;

  if (moviesData.data) {
    const data = moviesData.data as ApiJSONResponseType<MovieType>;
    const movies = data['hydra:member'];
    console.log(movies);

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
