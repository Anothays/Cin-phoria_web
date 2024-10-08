'use client';
import HamburgerMenu from '@/containers/Header/HamburgerMenu';
import { useGlobalContext } from '@/context/globalContext';
import classnames from 'classnames';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  // add background when scroll
  // add shadow when scroll
  const [hasScrolled, setHasScrolled] = useState(false);
  const session = useSession();
  const router = useRouter();

  const { openLoginModal, updateLoginProps } = useGlobalContext();
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await signOut({ callbackUrl: '/' });
  };

  const handlelogin = () => {
    updateLoginProps({
      title: 'Connexion',
      message: 'Connectez-vous pour accéder à votre compte',
      redirectionUrl: '/',
      callbackAction: () => {},
    });
    openLoginModal();
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
          <Link className={styles.navLink} href="/signup">
            Inscription
          </Link>
          {session.data?.user ? (
            <Link className={styles.navLink} href="" onClick={handleLogout}>
              Déconnexion
            </Link>
          ) : (
            <Link className={styles.navLink} href="" onClick={handlelogin}>
              Connexion
            </Link>
          )}
          <Link
            style={{ color: 'white' }}
            href=""
            onClick={async (e) => {
              e.preventDefault();
              const data = await getSession();
              console.log(data);
            }}
          >
            GetSession
          </Link>
        </nav>
        <HamburgerMenu />
      </div>
    </header>
  );
}
