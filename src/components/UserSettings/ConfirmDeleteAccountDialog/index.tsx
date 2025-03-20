import { useGlobalContext } from '@/contexts/GlobalContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

export default function ConfirmDeleteAccountDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data } = useSession();
  const { openSnackbar, setSnackbarContent } = useGlobalContext();

  const handleDeleteAccount = async () => {
    console.log(data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete-account/${data?.userInfos?.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du compte');
      }
      signOut();
      // router.push('/logout');
    } catch (error) {
      console.log(error);
      setSnackbarContent("Une erreur s'est produite lors de la suppression du compte");
      openSnackbar();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{'Confirmation de suppression'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleDeleteAccount} color="error" autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
