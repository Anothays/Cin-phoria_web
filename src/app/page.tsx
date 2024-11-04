import MovieList from '@/components/MovieList';
import Hero from '@/containers/HomePage/Hero';
import styles from './HomePage.module.scss';

export default async function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Bienvenue !</h1>
      </div>
      <h2 className={styles.title}>Les dernières sorties de ce mercredi</h2>
      <Hero />
      <h2 className={styles.title}>Nos coups de coeur à l&apos;affiche</h2>
      <MovieList />
    </div>
  );
}
