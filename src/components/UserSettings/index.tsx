'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { UserType } from '@/types/UserType';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './UserSettings.module.scss';

type UserSettingsFormType = {
  firstname: string;
  lastname: string;
};

const schema = z.object({
  firstname: z.string().min(3, { message: 'Veuillez renseigner votre prénom.' }),
  lastname: z.string().min(3, { message: 'Veuillez renseigner votre nom.' }),
});

type UserSettingsProps = {
  userInfos: UserType;
  token: string;
};

export default function UserSettings({ userInfos, token }: UserSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { update, data } = useSession();
  const router = useRouter();
  const { openSnackbar, setSnackbarContent } = useGlobalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: userInfos.firstname,
      lastname: userInfos.lastname,
    },
  });

  const onSubmit: SubmitHandler<UserSettingsFormType> = async (dataToSend) => {
    console.log('INITIAL DATA', data);

    // const mdr = await update({ coucou: 'lol' });
    // console.log('mdr ==> ', mdr);
    // return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userInfos.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        },
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      setSnackbarContent('Vos informations ont été mises à jour avec succès');
      openSnackbar();
      setIsEditing(false);
      await update({
        ...data,
        userInfos: {
          ...data?.userInfos,
          firstname: dataToSend.firstname,
          lastname: dataToSend.lastname,
        },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      setSnackbarContent("Une erreur s'est produite lors de la mise à jour");
      openSnackbar();
    }
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete-account/${userInfos.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
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
    <Box className={styles.container}>
      {!isEditing ? (
        <Box>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Prénom
              </Typography>
              <Typography>{userInfos.firstname}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nom
              </Typography>
              <Typography>{userInfos.lastname}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{userInfos.email}</Typography>
            </Box>
            <Box className={styles.actions}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                className={styles.updateButton}
              >
                Modifier mes informations
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenDialog(true)}
                className={styles.deleteButton}
              >
                Supprimer mon compte
              </Button>
            </Box>
          </Stack>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Typography variant="h6" gutterBottom>
            Modifier mes informations
          </Typography>
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Prénom"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nom"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Box className={styles.actions}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={styles.updateButton}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Enregistrer'}
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
          </Box>
        </form>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Confirmation de suppression'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
