'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import fetcher from '@/services/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './ContactForm.module.scss';

type ContactForm = {
  username: string;
  email: string;
  object: string;
  message: string;
  acceptTerms: boolean;
};

const schema = z.object({
  username: z.string().min(1, { message: "Renseignez un nom d'utilisateur" }),
  email: z.string().email('Renseignez une adresse e-mail valide'),
  object: z.string({}).min(1, { message: "Renseignez l'objet de votre demande" }),
  message: z.string().min(1, { message: 'Le message ne peut pas être vide' }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  }),
});

export default function ContactForm() {
  const { openSnackbar, setSnackbarContent } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ContactForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    try {
      const response = await fetcher('/email-contact', {
        body: JSON.stringify(data),
        method: 'POST',
      });
      setSnackbarContent(response.message);
      openSnackbar();
      router.push('/');
    } catch (error) {
      return alert(`Erreur: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p style={{ color: 'red', alignSelf: 'start' }}>{errors.root.message}</p>}
      <TextField
        {...register('username', { required: false })}
        label="Votre nom d'utilisateur"
        variant={'outlined'}
        type={'text'}
        fullWidth={true}
        error={!!errors.username}
        helperText={errors.username?.message}
        className={styles.textField}
      />
      <TextField
        {...register('email', { required: false })}
        label="Votre adresse e-mail"
        variant={'outlined'}
        type={'email'}
        fullWidth={true}
        error={!!errors.email}
        helperText={errors.email?.message}
        className={styles.textField}
      />
      <TextField
        {...register('object', { required: true })}
        label="Intitulé de votre demande"
        variant={'outlined'}
        type={'text'}
        fullWidth={true}
        error={!!errors.object}
        helperText={errors.object?.message}
        className={styles.textField}
      />
      <TextareaAutosize
        {...register('message', { required: true })}
        className={styles.textArea}
        minRows={10}
      />
      <FormControl error={!!errors.acceptTerms} className={styles.formControl}>
        <Controller
          name="acceptTerms"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="J'accepte que mes données soient sauvegardées pour traitement de ce formulaire"
            />
          )}
        />
        {errors.acceptTerms && <FormHelperText>{errors.acceptTerms.message}</FormHelperText>}
      </FormControl>
      <Button type="submit" variant={'contained'} size={'large'} color="primary">
        {isLoading ? <CircularProgress color={'info'} size={27} /> : <span>Envoyer</span>}
      </Button>
    </form>
  );
}
