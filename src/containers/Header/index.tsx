'use client';
import HamburgerMenu from '@/containers/Header/HamburgerMenu';
import { useGlobalContext } from '@/context/globalContext';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

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

  const handlelogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === '/login') return;
    updateLoginProps({
      title: 'Connexion',
      message: 'Connectez-vous pour accéder à votre compte',
      redirectionUrl: '/',
      callbackAction: undefined,
    });
    openLoginModal();
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === '/login') return;
    const targetUrl = e.currentTarget.href;
    if (session.status === 'unauthenticated') {
      updateLoginProps({
        title: 'Authentification requise',
        message: 'Connectez-vous pour accéder à vos réservations',
        redirectionUrl: targetUrl,
        callbackAction: async () => {
          router.push(targetUrl);
        },
      });
      openLoginModal();
      return;
    }
    if (session.status === 'authenticated') {
      router.push(targetUrl);
    }
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
          <Link className={styles.navLink} href="/">
            Accueil
          </Link>
          <Link className={styles.navLink} href="/movies">
            Les films
          </Link>
          <Link className={styles.navLink} href="/my_reservations" onClick={handleClick}>
            Mes réservations
          </Link>
          <Link className={styles.navLink} href="/contact">
            Contact
          </Link>
          {session.data?.user ? (
            <Link className={styles.navLink} href="" onClick={handleLogout}>
              Déconnexion
            </Link>
          ) : (
            <Link className={styles.navLink} href="/login" onClick={handlelogin}>
              Connexion
            </Link>
          )}
        </nav>
        <HamburgerMenu />
      </div>
    </header>
  );
}
