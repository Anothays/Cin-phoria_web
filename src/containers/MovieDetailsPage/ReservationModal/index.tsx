'use client';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './ReservationModal.module.scss';
import React from 'react';
import { useReservationModalContext } from '@/contexts/ReservationModalContext';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  width: '100%',
  maxWidth: '30rem',
};
export default function ReservationModal() {
  const { setReservationModalOpen, isReservationModalOpen, contentModal } =
    useReservationModalContext();
  return (
    <Modal open={isReservationModalOpen} onClose={() => setReservationModalOpen(false)}>
      <Box sx={style}>
        <div onClick={() => setReservationModalOpen(false)} className={styles.closeIcon}>
          <CloseIcon />
        </div>
        {contentModal}
      </Box>
    </Modal>
  );
}
