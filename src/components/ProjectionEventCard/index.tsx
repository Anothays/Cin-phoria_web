'use client';

import { useGlobalContext } from '@/context/globalContext';
import fetcher from '@/services/fetcher';
import { ProjectionEventType } from '@/types/ProjectionEventType';
import { ReservationType } from '@/types/ReservationType';
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './ProjectionEventCard.module.scss';
import AccessibleIcon from '@mui/icons-material/Accessible';

export default function ProjectionEventCard(projectionEvent: ProjectionEventType) {
  const { openLoginModal, updateLoginProps } = useGlobalContext();
  const router = useRouter();
  const session = useSession();
  const beginAt = projectionEvent.beginAt;
  const dateStart = projectionEvent.date.split('/').reverse().join('-');
  const now = Date.now();
  const disabled = Date.parse(`${dateStart} ${beginAt}`) - now < 0;
  const disabledStyle = {
    opacity: disabled ? '50%' : '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
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
    if (disabled) return;
    e.preventDefault();
    const projectionId = e.currentTarget.getAttribute('data-id');
    const targetUrl = e.currentTarget.href;
    if (session.status === 'unauthenticated') {
      updateLoginProps({
        title: 'Authentification requise',
        message: 'Connectez-vous pour réserver une séance',
        redirectionUrl: targetUrl,
        callbackAction: async (token: unknown, userId: unknown) => {
          const reservation = (await createNewReservation(
            projectionId!,
            token as string,
            userId as string,
          )) as ReservationType;
          if (!reservation) throw new Error('Error during reservation creation');
          localStorage.setItem('currentReservation', JSON.stringify(reservation));
          router.push(`/reservations/${reservation.id}`);
        },
      });
      openLoginModal();
      return;
    }
    if (session.status === 'authenticated' && session.data.userInfos) {
      if (!projectionId) throw new Error('No projection id provided');
      const reservation = await createNewReservation(
        projectionId,
        session.data.token,
        session.data.userInfos['@id'],
      );
      if (!reservation) throw new Error('Error during reservation creation');
      localStorage.setItem('currentReservation', JSON.stringify(reservation));
      router.push(`/reservations/${reservation.id}`);
    }
  };

  return (
    <Button
      href=""
      className={styles.container}
      style={disabledStyle}
      onClick={handleClick}
      disabled={disabled}
      data-id={projectionEvent['@id']}
    >
      <div className={styles.container} style={disabledStyle}>
        <div>
          <p className={styles.language}>{projectionEvent.language}</p>
          {projectionEvent.format.projectionFormatName !== 'STANDARD' ? (
            <p className={styles.projectionFormatName}>
              {projectionEvent.format.projectionFormatName}
            </p>
          ) : null}
        </div>
        <div>
          <div>
            <p className={styles.beginAt}>{projectionEvent.beginAt}</p>
            <p className={styles.endAt}>(fin {projectionEvent.endAt})</p>
            {/*<p className={styles.date}>{projectionEvent.date}</p>*/}
          </div>
          <div>
            {/*<p>{projectionEvent.movieTheater.theaterName}</p>*/}
            <p className={styles.room}>Salle {projectionEvent.projectionRoom.titleRoom}</p>
          </div>
        </div>

        <div>{projectionEvent.seatsForReducedMobility ? <AccessibleIcon /> : null}</div>
      </div>
    </Button>
  );
}
