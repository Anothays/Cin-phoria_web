'use client';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './LoginModal.module.scss';
import RateForm from './RateForm';
import { ReservationType } from '@/types/ReservationType';
import { Dispatch, SetStateAction } from 'react';

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

type RateModalType = {
  isRateModalOpen: boolean;
  closeRateModal: () => void;
  reservation: ReservationType;
  setReservationState: Dispatch<SetStateAction<ReservationType[]>>;
  reservationsState: ReservationType[];
};

export default function RateModal({
  isRateModalOpen,
  closeRateModal,
  reservation,
  setReservationState,
  reservationsState,
}: RateModalType) {
  return (
    <Modal open={isRateModalOpen} onClose={closeRateModal}>
      <Box sx={style}>
        <div onClick={closeRateModal} className={styles.closeIcon}>
          <CloseIcon />
        </div>
        <RateForm
          reservation={reservation}
          closeRateModal={closeRateModal}
          setReservationState={setReservationState}
          reservationsState={reservationsState}
        />
      </Box>
    </Modal>
  );
}
