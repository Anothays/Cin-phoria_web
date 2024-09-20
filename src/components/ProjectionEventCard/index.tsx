import { ProjectionEventType } from '@/types/ProjectionEventType';
import Link from 'next/link';
import styles from './ProjectionEventCard.module.scss';

export default function ProjectionEventCard(projectionEvent: ProjectionEventType) {
  console.log(projectionEvent);

  return (
    <Link
      href={`/movie_theaters/${projectionEvent.movieTheater.id}/projection_events/${projectionEvent.id}`}
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
