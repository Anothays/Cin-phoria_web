import { ProjectionEventType } from '@/types/ProjectionEventType';
import ProjectionEventCard from '../../../../components/ProjectionEventCard';
import styles from './ProjectionEventList.module.scss';

export default function ProjectionEventList(projectionEvents: ProjectionEventType[]) {
  return (
    <ul className={styles.projectionEventList}>
      {Object.values(projectionEvents).map((projectionEvent, key) => (
        <ProjectionEventCard {...projectionEvent} key={key} />
      ))}
    </ul>
  );
}
