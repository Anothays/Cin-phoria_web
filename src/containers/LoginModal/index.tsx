'use client';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useGlobalContext } from '@/context/globalContext';
import LoginForm from '@/containers/LoginModal/LoginForm';

const style = {
  display: 'flex',
  position: 'absolute' as 'absolute',
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
        <LoginForm />
      </Box>
    </Modal>
  );
}
