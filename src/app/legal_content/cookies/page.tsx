// pages/conditions-generales.tsx

'use client';

import { Box, Container } from '@mui/material';
import styles from './cookies.module.scss';

export default function CookiesPage() {
  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.content}>
        <h1 className={styles.title}>Politique de cookies</h1>

        <p>
          Cette politique de cookies explique comment Cin-phoria utilise les cookies et technologies
          similaires pour reconnaître votre visite sur notre site. Elle explique ce que sont ces
          technologies et pourquoi nous les utilisons, ainsi que vos droits pour contrôler leur
          utilisation.
        </p>

        <h2 className={styles.subtitle}>Qu&apos;est-ce qu&apos;un cookie ?</h2>

        <p>
          Un cookie est un petit fichier texte qui est stocké sur votre ordinateur ou appareil
          mobile lorsque vous visitez notre site. Les cookies sont largement utilisés par les
          propriétaires de sites web pour faire fonctionner leurs sites, ou pour fonctionner plus
          efficacement, ainsi que pour fournir des informations de reporting.
        </p>

        <h2 className={styles.subtitle}>Les cookies que nous utilisons</h2>

        <p>
          Nous utilisons différents types de cookies sur notre site. Voici la liste des cookies que
          nous utilisons et leur finalité :
        </p>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Cookies d&apos;authentification (authjs)</strong>
            <p>
              Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être
              désactivés. Ils sont utilisés pour gérer votre session et votre authentification sur
              notre site.
            </p>
          </li>

          <li className={styles.listItem}>
            <p>Cookies de consentement analytiques (cookies_consent_analytics)</p>
            <p>
              Ce cookie nous permet de savoir si vous avez accepté l&apos;utilisation de cookies
              analytiques. Ces cookies nous aident à comprendre comment vous utilisez notre site et
              à l&apos;améliorer.
            </p>
          </li>

          <li className={styles.listItem}>
            <strong>Cookies de consentement marketing (cookies_consent_marketing)</strong>
            <p>
              Ce cookie nous permet de savoir si vous avez accepté l&apos;utilisation de cookies
              marketing. Ces cookies sont utilisés pour vous proposer des contenus personnalisés et
              pertinents.
            </p>
          </li>

          <li className={styles.listItem}>
            <strong>Cookies essentiels (cookie_consent_essentials)</strong>
            <p>
              Ce cookie indique que nous vous avons informé de l&apos;utilisation des cookies
              essentiels sur notre site. Ces cookies sont nécessaires au bon fonctionnement du site
              et ne peuvent pas être désactivés.
            </p>
          </li>

          <li className={styles.listItem}>
            <strong>Préférences de cookies (cookie_preferences)</strong>
            <p>
              La présence de ce cookie indique que nous vous avons déjà demandé votre consentement
              concernant l&apos;utilisation des cookies. Il stocke vos préférences pour éviter de
              vous redemander votre consentement à chaque visite.
            </p>
          </li>
        </ul>

        <h2 className={styles.subtitle}>Comment gérer vos préférences de cookies ?</h2>

        <p>
          Vous pouvez modifier vos préférences de cookies à tout moment en cliquant ici. Vous pouvez
          choisir d&apos;accepter tous les cookies, de les refuser tous, ou de personnaliser vos
          préférences.
        </p>

        <p>
          Notez que les cookies essentiels (authjs) ne peuvent pas être désactivés car ils sont
          nécessaires au bon fonctionnement du site.
        </p>
      </Box>
    </Container>
  );
}
