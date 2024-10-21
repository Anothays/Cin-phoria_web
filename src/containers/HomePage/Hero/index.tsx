import SearchArea from '@/containers/HomePage/Hero/SearchArea';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Bienvenue</h1>
        <SearchArea />
      </div>
    </section>
  );
}
