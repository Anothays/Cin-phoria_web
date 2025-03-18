import styles from './LegalContent.module.scss';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <section className={styles.warningSection}>
        <p>
          Le texte ci-dessous constitue les informations légales d&apos;un site web représentant une
          entreprise factice. Le présent site s&apos;inscrit dans le cadre d&apos;une évaluation de
          fin de formation initiée par l&apos;organisme <a href="https://www.studi.com/fr">STUDI</a>
          . En conséquence, toutes les données apparaissant dans le présent texte, et sur le site
          dans son entièreté, ne sont reliées d&apos;aucune manière à une personne physique ou
          morale existante. Toutes les images utilisées pour l&apos;illustration du présent site web
          sont fournies par le site Pixabay. Ces images sont sous licence &quot;Creative Commons
          Zero (CC0)&quot;. sous licence &quot;Creative Commons Zero (CC0)&quot;.
        </p>
      </section>
      {children}
    </div>
  );
}
