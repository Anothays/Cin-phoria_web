'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './SignupForm.module.scss';

type CustomerSignupFormType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  confirmPassword: string;
};

const schema = z
  .object({
    firstname: z.string().min(3, { message: 'Veuillez renseigner votre prénom.' }),
    lastname: z.string().min(3, { message: 'Veuillez renseigner votre nom.' }),
    email: z.string().email({ message: 'Veuillez renseigner une adresse e-mail valide.' }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Vous devez accepter les conditions d'utilisation" }),
    }),
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

export default function SignupForm() {
  const { openSnackbar, setSnackbarContent } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerSignupFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<CustomerSignupFormType> = async (data) => {
    setIsLoading(true);
    try {
      const dataToSend = JSON.stringify(data);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        method: 'POST',
        body: dataToSend,
        headers: {
          ['Content-type']: 'application/ld+json',
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        alert(responseData.detail);
        return;
      }
      setSnackbarContent(
        `Un email de confirmation a été envoyé à l'adresse : ${data.email}. Veuillez cliquer sur le lien qu'il contient pour pouvoir vous authentifier`,
      );
      openSnackbar();
      router.push('/');
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('firstname', { required: true })}
        label="Prénom"
        variant={'outlined'}
        fullWidth={true}
        error={!!errors.firstname}
        helperText={errors.firstname?.message}
      />
      <TextField
        {...register('lastname', { required: true })}
        label="Nom"
        variant={'outlined'}
        fullWidth={true}
        error={!!errors.lastname}
        helperText={errors.lastname?.message}
      />
      <TextField
        {...register('email', { required: true })}
        label="Adresse e-mail"
        variant={'outlined'}
        type={'email'}
        fullWidth={true}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password', { required: true })}
        label="Mot de passe"
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
      <FormControl error={!!errors.acceptTerms}>
        <Controller
          name="acceptTerms"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="J'accepte les conditions d'utilisation"
            />
          )}
        />
        {errors.acceptTerms && <FormHelperText>{errors.acceptTerms.message}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant={'contained'} size={'large'}>
        {isLoading ? <CircularProgress color={'info'} size={27} /> : <span>Je m&apos;inscris</span>}
      </Button>
    </form>
  );
}
