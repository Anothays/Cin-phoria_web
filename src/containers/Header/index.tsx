'use client';
import HamburgerMenu from '@/containers/Header/HamburgerMenu';
import { useGlobalContext } from '@/context/globalContext';
import classnames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import { Button } from '@mui/material';

export default function Header() {
  const { status, data, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { openLoginModal, updateLoginProps } = useGlobalContext();

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    return signOut({ callbackUrl: '/' });
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

  const test = async () => {
    // const lol = await update();
    console.log(status, data);
    // console.log(lol);
  };

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
          <Button onClick={test}>CKICK</Button>
          {data ? (
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
