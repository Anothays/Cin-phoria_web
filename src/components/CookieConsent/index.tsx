'use client';

import { useState } from 'react';
import styles from './CookieConsent.module.scss';
import { acceptUserCookieConsent } from '@/lib/cookie';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type CookieModalProps = {
  cookie_consent: RequestCookie | undefined;
};

export default function CookieModal({ cookie_consent }: CookieModalProps) {
  const [isVisible, setIsVisible] = useState(cookie_consent === undefined);

  const handleClick = () => {
    acceptUserCookieConsent();
    setIsVisible(false);
  };

  return (
    <div
      role="alert"
      className={styles.container}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <h3>Ce site utilise des cookies</h3>
      <p>
        Ce site utilise uniquement des cookies essentiels afin d’assurer son bon fonctionnement et
        d’améliorer votre expérience de navigation. Aucune de vos données personnelles ne sera
        utilisée à des fins commerciales
      </p>
      <button className={styles.button} onClick={handleClick}>
        J&apos;ai compris
      </button>
    </div>
  );
}
