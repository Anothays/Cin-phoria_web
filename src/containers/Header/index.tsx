'use client';
import HamburgerMenu from '@/containers/Header/HamburgerMenu';
import { useGlobalContext } from '@/contexts/GlobalContext';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import { useEffect } from 'react';

export default function Header() {
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { openLoginModal, updateLoginProps } = useGlobalContext();

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await revokeAccessToken();
    return signOut({ callbackUrl: '/' });
  };

  const revokeAccessToken = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${data?.token}` },
    });
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
    if (status === 'unauthenticated') {
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
    if (status === 'authenticated') {
      router.push(targetUrl);
    }
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <header className={styles.mainContainer}>
      <div className={styles.placeHolder} />
      <div className={classnames(styles.container)}>
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
          {status === 'authenticated' ? (
            <Link className={styles.navLink} href="" onClick={handleLogout}>
              Déconnexion
            </Link>
          ) : status === 'loading' ? (
            <span className={styles.navLink}>Chargement</span>
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
