'use client';

import { useGlobalContext } from '@/context/globalContext';
import fetcher from '@/services/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './NewPasswordForm.module.scss';

type NewPasswordForm = {
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    password: z
      .string()
      .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
      .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
      .regex(/[\W_]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export default function NewPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { setSnackbarContent, openSnackbar } = useGlobalContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: NewPasswordForm) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetcher(`/reset-password/reset/${token}`, {
        body: JSON.stringify(data),
        method: 'POST',
      });
      if (!response.ok) throw new Error('Error');
      const result = await response.json();
      setIsLoading(false);
      setIsDisabled(true);
      setSnackbarContent(result.message);
      openSnackbar();
      router.push('/login');
    }, 1000);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p style={{ color: 'red', alignSelf: 'start' }}>{errors.root.message}</p>}
      <TextField
        {...register('password', { required: false })}
        label="Nouveau mot de passe"
        variant={'outlined'}
        type={'password'}
        fullWidth={true}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        {...register('confirmPassword')}
        label="Confirmez votre mot de passe"
        variant={'outlined'}
        type={'password'}
        fullWidth={true}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
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
