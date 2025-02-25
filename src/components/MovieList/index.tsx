'use client';

import { useMovies } from '@/services/movies';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieType } from '@/types/MovieType';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MovieList.module.scss';

export default function MovieList() {
  const moviesData = useMovies(`staffFavorite=true`);

  if (moviesData.isLoading) return <CircularProgress size={60} sx={{ marginY: '17rem' }} />;

  if (moviesData.data) {
    const data = moviesData.data as ApiJSONResponseType<MovieType>;
    const movies = data['hydra:member'];

    return (
      <div className={styles.container}>
        {movies?.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <Image
              className={styles.image}
              width={350}
              height={500}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
              alt={`Image du film ${movie.title}`}
            />
          </Link>
        ))}
      </div>
    );
  }
}
