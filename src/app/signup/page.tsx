'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './Signup.module.scss';

type CustomerSignupFormType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const schema = z.object({
  firstname: z.string().min(3, { message: 'Veuiller renseigner votre prénom.' }),
  lastname: z.string().min(3, { message: 'Veuiller renseigner votre nom.' }),
  email: z.string().email({ message: 'Veuiller renseigner une adresse e-mail valide.' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' }),
});

export default function CustomerSignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerSignupFormType>({
    resolver: zodResolver(schema),
  });
  console.log('test error', errors);
  const onSubmit: SubmitHandler<CustomerSignupFormType> = (data) => console.log(data);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      <p className={styles.subText}>Afin de pouvoir réserver vos ticket en ligne</p>

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
        <Button type="submit" variant={'contained'} size={'large'}>
          Je m&apos;inscris
        </Button>
      </form>
    </div>
  );
}
