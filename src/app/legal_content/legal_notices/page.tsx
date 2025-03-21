// pages/mentions-legales.tsx

import Link from 'next/link';
import styles from './LegalNotices.module.scss';

export default function MentionsLegales() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mentions légales</h1>

      <section className={styles.section}>
        <h2>Édition du site</h2>

        <p>
          Le présent site, accessible depuis l'adresse{' '}
          <Link href={process.env.NEXT_PUBLIC_BASE_URL}>{process.env.NEXT_PUBLIC_BASE_URL}</Link>,
          est édité par Cinéphoria, société au capital de 1 000 000 euros, inscrite au R.C.S. de
          Versailles sous le numéro RCS VERSAILLES 123 456 789 00001, dont le siège social est situé
          au 1170 Av. de Saint-Germain, Plaisir, représenté(e) par Jérémy Sananikone dûment
          habilité(e)
        </p>

        <p>
          <strong>Nom ou raison sociale</strong> : Cinéphoria
        </p>
        <p>
          <strong>Forme juridique</strong> : SARL
        </p>
        <p>
          <strong>Numéro de TVA instracommunautaire </strong> : FRXXXXXXXXXXX
        </p>
        <p>
          <strong>Siège social</strong> : 1170 Av. de Saint-Germain, Plaisir
        </p>
        <p>
          <strong>Numéro de téléphone</strong> : 0123456789
        </p>
        <p>
          <strong>Adresse e-mail</strong> :{' '}
          <Link href="mailto:cinephoria@jeremysnnk.ovh">cinephoria@jeremysnnk.ovh</Link>
        </p>
        <p>
          <strong>Numéro d’immatriculation au RCS</strong> : 123 456 789 00001 (fictif)
        </p>
        <p>
          <strong>Numéro de TVA intracommunautaire</strong> : FR12 345 678 901 (fictif)
        </p>
        <p>
          <strong>Directeur de la publication</strong> : Jérémy Sananikone
        </p>
      </section>

      <section className={styles.section}>
        <h2>Hébergement du site</h2>
        <p>
          <strong>Nom de l’hébergeur</strong> : OVH
        </p>
        <p>
          <strong>Site internet</strong> :{' '}
          <Link href="https://www.ovh.com">https://www.ovh.com</Link>
        </p>
        <p>
          <strong>Adresse</strong> : 2, rue Kellermann, 59100 Roubaix, France
        </p>
        <p>
          <strong>Numéro de téléphone</strong> : Non communiqué
        </p>
      </section>

      <section className={styles.section}>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le contenu du site, y compris les images, textes, logos, et autres éléments graphiques,
          est protégé par des droits d’auteur. Les images utilisées sur le site (affiches de
          cinémas) ont été récupérées depuis AlloCiné, et sont utilisées à titre d’illustration
          uniquement dans le cadre de ce projet fictif. Aucune utilisation commerciale n’est faite
          des éléments graphiques du site.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Protection des données personnelles</h2>
        <p>
          Conformément à la législation en vigueur, nous nous engageons à protéger les données
          personnelles de nos utilisateurs. Pour plus d’informations sur la collecte et
          l’utilisation des données, veuillez consulter notre
          <Link href="/legal_content/privacy_policy"> politique de confidentialité</Link>. Nous
          respectons les lois relatives à la protection des données personnelles, telles que le
          Règlement Général sur la Protection des Données (RGPD).
        </p>
      </section>

      <section className={styles.section}>
        <h2>Cookies</h2>
        <p>
          Le site utilise des <strong>cookies essentiels</strong> au bon fonctionnement du site,
          notamment pour l’authentification des utilisateurs via NextAuth. En utilisant ce site,
          vous acceptez l’utilisation de ces cookies. Pour plus d’informations sur l’utilisation des
          cookies, veuillez consulter notre{' '}
          <Link href="/legal_content/privacy_policy">politique de confidentialité</Link>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Limitation de responsabilité</h2>
        <p>
          Le site Cinéphoria met tout en œuvre pour offrir des informations fiables et à jour, mais
          ne saurait être tenu responsable de toute erreur, omission ou d’un quelconque dommage
          résultant de l’utilisation des informations fournies. L’utilisateur est seul responsable
          de l’utilisation des informations disponibles sur ce site.
        </p>
      </section>
    </div>
  );
}
