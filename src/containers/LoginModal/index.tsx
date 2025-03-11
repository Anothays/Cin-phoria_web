'use client';
import LoginForm from '@/containers/LoginModal/LoginForm';
import { useGlobalContext } from '@/contexts/GlobalContext';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './LoginModal.module.scss';

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
export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useGlobalContext();

  return (
    <Modal open={isLoginModalOpen} onClose={closeLoginModal}>
      <Box sx={style}>
        <div onClick={closeLoginModal} className={styles.closeIcon}>
          <CloseIcon />
        </div>
        <LoginForm />
      </Box>
    </Modal>
  );
}
