import { useGlobalContext } from '@/contexts/GlobalContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './UserInfosForm.module.scss';

type UserSettingsFormType = {
  firstname: string;
  lastname: string;
};

const schema = z.object({
  firstname: z.string().min(1, { message: 'Veuillez renseigner votre prénom.' }),
  lastname: z.string().min(1, { message: 'Veuillez renseigner votre nom.' }),
});

export default function UserInfosForm({
  setIsEditing,
}: {
  setIsEditing: (isEditing: boolean) => void;
}) {
  const { update, data } = useSession();
  const router = useRouter();
  const { openSnackbar, setSnackbarContent } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: data?.userInfos?.firstname,
      lastname: data?.userInfos?.lastname,
    },
  });

  const onSubmit = async (dataToSend: UserSettingsFormType) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${data?.userInfos?.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: `Bearer ${data?.token}`,
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
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      setSnackbarContent("Une erreur s'est produite lors de la mise à jour");
      openSnackbar();
    }
    setIsLoading(false);
  };

  return (
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
  );
}
