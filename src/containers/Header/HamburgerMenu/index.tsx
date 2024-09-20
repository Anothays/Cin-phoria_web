'use client';
import styles from './HamburgerMenu.module.scss';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useGlobalContext } from '@/context/globalContext';

const DrawerList = ({ onClose }: { onClose: () => void }) => {
  const links = [
    {
      href: '/signup/jobber',
      title: 'Devenir prestataire',
    },
    {
      href: '',
      title: 'Connexion',
    },
    {
      href: '/signup',
      title: 'Inscription',
    },
  ];
  const { openLoginModal } = useGlobalContext();
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {links.map((link) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton
              href={link.href}
              onClick={() => {
                if (link.title === 'Connexion') {
                  openLoginModal();
                  onClose();
                }
              }}
            >
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
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
        <DrawerList onClose={() => setOpened(false)} />
      </Drawer>
    </div>
  );
}
