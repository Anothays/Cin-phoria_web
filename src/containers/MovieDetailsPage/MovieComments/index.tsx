import CommentCard from '@/components/CommentCard';
import { CommentType } from '@/types/CommentType';
import styles from './MovieComments.module.scss';

export default function MovieComments({ comments }: { comments: CommentType[] }) {


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quelques avis...</h2>
      {comments.length === 0 ? <p className="notFoundMessage">Pas d&apos;avis pour le moment</p> :
      comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))
      }
    </div>
  );
}
