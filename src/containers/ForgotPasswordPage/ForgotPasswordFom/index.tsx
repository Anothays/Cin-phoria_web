'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import fetcher from '@/services/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './ForgotPasswordForm.module.scss';

type ContactForm = {
  email: string;
};

const schema = z.object({
  email: z.string().email('Renseignez une adresse e-mail valide'),
});

export default function PasswordForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const { setSnackbarContent, openSnackbar } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    const result = await fetcher('/reset-password', {
      body: JSON.stringify(data),
      method: 'POST',
    });
    setIsLoading(false);
    setIsDisabled(true);
    setSnackbarContent(result.message);
    openSnackbar();
    setEmail(data.email);
  };

  const submitAgain = () => {
    alert('Feature en développement');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p style={{ color: 'red', alignSelf: 'start' }}>{errors.root.message}</p>}
      <TextField
        {...register('email', { required: false })}
        label="Votre adresse e-mail"
        variant={'outlined'}
        type={'email'}
        fullWidth={true}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      {email ? (
        <p className={styles.buttonLink} onClick={submitAgain}>
          Vous n&apos;avez rien reçu ? Renvoyer de nouveau
        </p>
      ) : null}
      <Button
        type="submit"
        variant={'contained'}
        size={'large'}
        color="primary"
        sx={{ width: '100%' }}
        disabled={isDisabled}
      >
        {isLoading ? <CircularProgress color={'info'} size={27} /> : <span>Valider</span>}
      </Button>
    </form>
  );
}
