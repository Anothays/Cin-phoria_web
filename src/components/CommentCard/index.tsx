import { CommentType } from '@/types/CommentType';
import Rating from '../Rating';
import styles from './CommentCard.module.scss';

export default function CommentCard({ comment }: { comment: CommentType }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.username}>
          Par {comment.user?.firstname} {comment.user?.lastname}
        </p>
      </div>
      <div className={styles.body}>
        <blockquote>{comment.body}</blockquote>
      </div>
      <Rating rate={comment.rate} withTotal={false} />
    </div>
  );
}
