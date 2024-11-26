import { ProjectionEventType } from '@/types/ProjectionEventType';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Button, CircularProgress } from '@mui/material';
import { useReservationModalContext } from '@/context/ReservationModalContext';
import styles from './ReservationForm.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

export default function ReservationForm({
  projectionEvent,
}: {
  projectionEvent: ProjectionEventType;
}) {
  const movieTheater = projectionEvent.movieTheater;
  const { movieData } = useReservationModalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const movie = movieData.data;

  const handleClick = async () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (movie) {
    return (
      <div className={styles.container}>
        <div className={styles.date}>{projectionEvent.date}</div>
        <div>
          <span className={styles.beginAt}>{projectionEvent.beginAt}</span>
          <span>{projectionEvent.seatsForReducedMobility}</span>
        </div>
        <div className={styles.language}>{projectionEvent.language}</div>
        <div className={styles.movie}>
          <div className={styles.movieInfos}>
            <span>
              <span className={styles.title}>{movie.title}</span>
              <span className={styles.minimumAge}>-{movie.minimumAge}</span>
            </span>
            <span className={styles.durationInMinutes}>
              Durée : {movie.durationInMinutes} minutes
            </span>
            <span className={styles.time}>Fin prévue à {projectionEvent.endAt}</span>
          </div>
          <Image
            className={styles.image}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
            width={100}
            height={100}
            alt={movie.coverImageName}
          />
        </div>
        <div className={styles.movieTheater}>
          <div className={styles.movieTheaterInfos}>
            <p className={styles.movieTheaterName}>{movieTheater.theaterName}</p>
            <p className={styles.movieTheaterCity}>{movieTheater.city}</p>
          </div>
        </div>
        <div className={styles.pmrContainer}>
          {projectionEvent.seatsForReducedMobility ? (
            <div className={styles.pmr}>
              <AccessibleIcon />
              <span>Accessible aux PMR</span>
            </div>
          ) : null}
        </div>
        <Button className={styles.button} onClick={handleClick}>
          {isLoading ? (
            <CircularProgress size={25} style={{ color: 'white' }} />
          ) : (
            <span className={styles.buttonLabel}>
              <ConfirmationNumberIcon /> Réserver maintenant
            </span>
          )}
        </Button>
      </div>
    );
  }
}
