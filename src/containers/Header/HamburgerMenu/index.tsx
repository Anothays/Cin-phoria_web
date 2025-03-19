'use client';
import { useGlobalContext } from '@/contexts/GlobalContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './HamburgerMenu.module.scss';

const DrawerList = ({ setOpened }: { setOpened: (opened: boolean) => void }) => {
  console.log('DRAWER LIST');

  const { openLoginModal, updateLoginProps } = useGlobalContext();
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpened(false);
    await signOut({ callbackUrl: '/' });
  };

  const handlelogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === '/login') return;
    updateLoginProps({
      title: 'Connexion',
      message: 'Connectez-vous pour accéder à votre compte',
      redirectionUrl: '/',
      callbackAction: () => setOpened(false),
    });
    openLoginModal();
  };

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    console.log('HANDLE CLICK');

    if (pathname === '/login') return;
    const targetUrl = event.currentTarget.href;
    if (status === 'unauthenticated') {
      updateLoginProps({
        title: 'Authentification requise',
        message: 'Connectez-vous pour accéder à vos réservations',
        redirectionUrl: targetUrl,
        callbackAction: async () => {
          setOpened(false);
          router.push(targetUrl);
        },
      });
      openLoginModal();
      return;
    }
    if (status === 'authenticated') {
      setOpened(false);
      router.push(targetUrl);
    }
  };

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/movies', label: 'Les films' },
    { path: '/my_reservations', label: 'Mes réservations', onClick: handleClick },
    { path: '/contact', label: 'Contact' },
    status === 'authenticated'
      ? { path: '', label: 'Déconnexion', onClick: handleLogout }
      : { path: '/login', label: 'Connexion', onClick: handlelogin },
  ];

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List className={styles.navContainer}>
        <nav>
          {navLinks.map((link) => (
            <ListItem key={link.path}>
              <Link
                className={styles.navLink}
                href={link.path}
                onClick={(e) => {
                  return link.onClick ? link.onClick(e) : setOpened(false);
                }}
              >
                {link.label}
              </Link>
            </ListItem>
          ))}
        </nav>
      </List>
    </Box>
  );
};

export default function HamburgerMenu() {
  console.log('HAMBURGER MENU');

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
        <DrawerList setOpened={setOpened} />
      </Drawer>
    </div>
  );
}
