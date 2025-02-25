'use client';

import { ProjectionEventType } from '@/types/ProjectionEventType';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Button, CircularProgress } from '@mui/material';
import { useReservationModalContext } from '@/context/ReservationModalContext';
import styles from './ReservationForm.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useSession } from 'next-auth/react';
import { useGlobalContext } from '@/context/globalContext';
import { ReservationType } from '@/types/ReservationType';
import fetcher from '@/services/fetcher';
import { useRouter } from 'next/navigation';

export default function ReservationForm({
  projectionEvent,
}: {
  projectionEvent: ProjectionEventType;
}) {
  const movieTheater = projectionEvent.movieTheater;
  const router = useRouter();
  const session = useSession();
  const { movieData } = useReservationModalContext();
  const { openLoginModal, updateLoginProps } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const movie = movieData.data;

  const createNewReservation = async (
    projectionId: string,
    token: string,
    userId: string,
  ): Promise<ReservationType> => {
    const body = {
      user: userId,
      projectionEvent: projectionId,
    };
    const response = await fetcher('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/ld+json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (session.status === 'authenticated') {
        const reservation = (await createNewReservation(
          projectionEvent['@id'],
          session.data.token,
          session.data.userInfos['@id'],
        )) as ReservationType;
        if (!reservation) throw new Error('Error during reservation creation');
        router.push(`/reservations/${reservation.id}`);
        return;
      } else {
        updateLoginProps({
          title: 'Authentification requise',
          message: 'Connectez-vous pour réserver une séance',
          callbackAction: async (token: unknown, userId: unknown) => {
            const reservation = (await createNewReservation(
              projectionEvent['@id'],
              token as string,
              userId as string,
            )) as ReservationType;
            if (!reservation) throw new Error('Error during reservation creation');
            router.push(`/reservations/${reservation.id}`);
          },
        });
        openLoginModal();
      }
    } catch (error) {
      console.log(error);
    }
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
            <CircularProgress size={24} style={{ color: 'white' }} />
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
