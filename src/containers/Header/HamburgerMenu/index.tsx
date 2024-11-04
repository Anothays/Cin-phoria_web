'use client';
import { useGlobalContext } from '@/context/globalContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { useMemo, useState } from 'react';
import styles from './HamburgerMenu.module.scss';
// import { signOutAction } from '@/actions/signin';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DrawerList = () => {
  const { openLoginModal, updateLoginProps } = useGlobalContext();
  const { status, data } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // const links = useMemo(() => {
  //   if (status === 'authenticated') {
  //     return [
  //       {
  //         href: '/account',
  //         title: 'Account',
  //       },

  //       {
  //         onClick: () => {
  //           // signOutAction();
  //           onClose();
  //         },
  //         title: 'Déconnexion',
  //       },
  //     ];
  //   }
  //   return [
  //     {
  //       href: '/signup/jobber',
  //       title: 'Devenir prestataire',
  //     },
  //     {
  //       onClick: () => {
  //         openLoginModal();
  //         onClose();
  //       },
  //       title: 'Connexion',
  //     },
  //     {
  //       href: '/signup',
  //       title: 'Inscription',
  //     },
  //   ];
  // }, [onClose, openLoginModal, status]);

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

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === '/login') return;
    const targetUrl = event.currentTarget.href;
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

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List className={styles.navContainer}>
        <nav>
          <ListItem>
            <Link className={styles.navLink} href="/">
              Accueil
            </Link>
          </ListItem>
          <ListItem>
            <Link className={styles.navLink} href="/movies">
              Les films
            </Link>
          </ListItem>
          <ListItem>
            <Link className={styles.navLink} href="/my_reservations" onClick={handleClick}>
              Mes réservations
            </Link>
          </ListItem>
          <ListItem>
            <Link className={styles.navLink} href="/contact">
              Contact
            </Link>
          </ListItem>
          {data?.user ? (
            <ListItem>
              <Link className={styles.navLink} href="" onClick={handleLogout}>
                Déconnexion
              </Link>
            </ListItem>
          ) : (
            <ListItem>
              <Link className={styles.navLink} href="/login" onClick={handlelogin}>
                Connexion
              </Link>
            </ListItem>
          )}
        </nav>
      </List>
    </Box>
  );
};

export default function HamburgerMenu() {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="check">
        <input
          className={styles.input}
          type="checkbox"
          id="check"
          onChange={(e) => setOpened(e.target.checked)}
          checked={opened}
        />
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </label>
      <Drawer open={opened} onClose={() => setOpened(false)} anchor={'right'}>
        <DrawerList />
      </Drawer>
    </div>
  );
}
