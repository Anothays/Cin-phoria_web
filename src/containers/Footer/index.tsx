import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.mainContainer}>
      <div className={styles.infoSection}>
        <div className={styles.contactSection}>
          <h3>Nous contacter</h3>
          <small>siège social</small>
          <address className={styles.contactSection}>
            <a href={`mailto:${process.env.CINEPHORIA_EMAIL}`}>{process.env.CINEPHORIA_EMAIL}</a>
            <a href="tel:0123456789">0123456789</a>
          </address>
        </div>
        <div className={styles.horaireSection}>
          <h3>Horaires*</h3>
          <div className={styles.horaireContent}>
            <div>
              <p>LUNDI :</p>
              <p>MARDI :</p>
              <p>MERCREDI :</p>
              <p>JEUDI :</p>
              <p>VENDREDI :</p>
              <p>SAMEDI :</p>
              <p>DIMANCHE :</p>
            </div>
            <div>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
              <p>10h30 - 20h00</p>
            </div>
          </div>
          <small>*Tous nos cinémas sont soumis aux mêmes horaires</small>
        </div>
      </div>
      <div className={styles.legalSection}>
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
          <p>© Cinéphoria cinémas services {new Date().getFullYear()}</p>
          <p>® Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
