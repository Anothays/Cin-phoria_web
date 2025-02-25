'use client';

import CommentCard from '@/components/CommentCard';
import styles from './MovieComments.module.scss';
import { useReservationModalContext } from '@/context/ReservationModalContext';
import { CircularProgress } from '@mui/material';

export default function MovieComments() {
  const { movieData } = useReservationModalContext();
  if (movieData.isLoading) return <CircularProgress />;

  if (movieData.data) {
    const movie = movieData.data;
    const comments = movie.comments;
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Quelques avis...</h2>
        {comments.length === 0 ? (
          <p className="notFoundMessage">Pas d&apos;avis pour le moment</p>
        ) : (
          comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
        )}
      </div>
    );
  }
}
