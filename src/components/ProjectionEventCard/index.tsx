'use client';

import { useGlobalContext } from '@/context/globalContext';
import fetcher from '@/services/fetcher';
import { ProjectionEventType } from '@/types/ProjectionEventType';
import { ReservationType } from '@/types/ReservationType';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ProjectionEventCard.module.scss';

export default function ProjectionEventCard(projectionEvent: ProjectionEventType) {
  const { openLoginModal, updateLoginProps } = useGlobalContext();
  const router = useRouter();
  const session = useSession();

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

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectionId = e.currentTarget.getAttribute('projectionid');
    const targetUrl = e.currentTarget.href;
    if (session.status === 'unauthenticated') {
      updateLoginProps({
        title: 'Authentification requise',
        message: 'Connectez-vous pour réserver une séance',
        redirectionUrl: targetUrl,
        callbackAction: async (token: string, userId: string) => {
          const reservation = (await createNewReservation(
            projectionId!,
            token,
            userId,
          )) as ReservationType;
          if (!reservation) throw new Error('Error during reservation creation');
          console.log('reservation => ', reservation);
          localStorage.setItem('currentReservation', JSON.stringify(reservation));
          router.push(`/reservations/${reservation.id}`);
        },
      });
      openLoginModal();
      return;
    }
    if (session.status === 'authenticated') {
      if (!projectionId) throw new Error('No projection id provided');
      const reservation = await createNewReservation(
        projectionId,
        session.data.token,
        session.data.user['@id'],
      );
      if (!reservation) throw new Error('Error during reservation creation');
      localStorage.setItem('currentReservation', JSON.stringify(reservation));
      router.push(`/reservations/${reservation.id}`);
    }
  };

  return (
    <Link
      // href={`/movie_theaters/${projectionEvent.movieTheater.id}/projection_events/${projectionEvent.id}`}
      href={''}
      onClick={handleClick}
      projectionid={projectionEvent['@id']}
    >
      <div className={styles.container}>
        <span>
          {projectionEvent.beginAt} - {projectionEvent.language}
        </span>
        {projectionEvent.format.projectionFormatName !== 'STANDARD' ? (
          <span>{projectionEvent.format.projectionFormatName}</span>
        ) : null}
        <div className={styles.tiny}>
          <p>{projectionEvent.movieTheater.theaterName}</p>
          <p>{projectionEvent.date}</p>
        </div>
        <div></div>
        <p>Salle {projectionEvent.projectionRoom.titleRoom}</p>
      </div>
    </Link>
  );
}
