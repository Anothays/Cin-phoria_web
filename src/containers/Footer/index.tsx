import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          {/* <p className={styles.category}>Découvrir</p> */}
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link className={styles.link} href="/">
                Politique RH du groupe
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.link} href="/">
                Politique de confidentialité
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.link} href="/">
                Conditions générales
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.link} href="/">
                Mentions légales
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.link} href="/">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.logoContainer}>
          <p>© Cinéphoria cinémas services 2024</p>
          <p>® Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
