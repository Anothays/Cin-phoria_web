'use client';

import ReservationForm from '@/containers/MovieDetailsPage/ReservationModal/ReservationForm';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { useReservationModalContext } from '@/contexts/ReservationModalContext';
import { ProjectionEventType } from '@/types/ProjectionEventType';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { Button } from '@mui/material';
import styles from './ProjectionEventCard.module.scss';

export default function ProjectionEventCard(projectionEvent: ProjectionEventType) {
  const { closeLoginModal } = useGlobalContext();
  const beginAt = projectionEvent.beginAt;
  const dateStart = projectionEvent.date.split('/').reverse().join('-');
  const now = Date.now();
  const disabled = Date.parse(`${dateStart} ${beginAt}`) - now < 0;
  const disabledStyle = {
    opacity: disabled ? '50%' : '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
  const { setReservationModalOpen, setContentModal } = useReservationModalContext();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) return;
    e.preventDefault();
    closeLoginModal();
    setContentModal(<ReservationForm projectionEvent={projectionEvent} />);
    setReservationModalOpen(true);
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
      <div>
        {/*<p>{projectionEvent.id}</p>*/}
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

      <div>
        {projectionEvent.seatsForReducedMobility ? <AccessibleIcon className={styles.pmr} /> : null}
      </div>
    </Button>
  );
}
