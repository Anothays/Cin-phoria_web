'use client';
import HamburgerMenu from '@/containers/Header/HamburgerMenu';
import { useGlobalContext } from '@/context/globalContext';
import { logout } from '@/services/authentication';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  // add background when scroll
  // add shadow when scroll
  const [hasScrolled, setHasScrolled] = useState(false);

  const { openLoginModal, isLogged, setIsLogged } = useGlobalContext();
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const response = logout();
    if (response) setIsLogged(false);
  };

  return (
    <header className={styles.mainContainer}>
      <div className={styles.placeHolder} />
      <div
        className={classnames(styles.container, {
          [styles.scrolledContainer]: hasScrolled,
        })}
      >
        <Link href="/">
          <Image src="/cinephoria_logo.png" width={80} height={80} alt="logo of Cinéphoria" />
        </Link>

        <nav className={styles.navContainer}>
          <Link className={styles.navLink} href="/movies-theaters">
            Cinémas
          </Link>
          <Link className={styles.navLink} href="/movies">
            Films
          </Link>
          <Link className={styles.navLink} href="/signup/customer">
            Inscription
          </Link>
          {isLogged ? (
            <Link className={styles.navLink} href={'/'} onClick={handleLogout}>
              Déconnexion
            </Link>
          ) : (
            <Link className={styles.navLink} href={''} onClick={openLoginModal}>
              Connexion
            </Link>
          )}
        </nav>
        <HamburgerMenu />
      </div>
    </header>
  );
}
