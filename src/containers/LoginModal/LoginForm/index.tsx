'use client';

import { useGlobalContext } from '@/context/globalContext';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './LoginForm.module.scss';
import { authenticate } from '@/lib/authenticate';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

type LoginForm = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email({ message: 'Veuiller renseigner une adresse e-mail valide.' }),
  password: z.string().min(4, { message: 'Le mot de passe doit contenir au moins 4 caractères.' }),
});

export default function LoginForm() {
  const { closeLoginModal, loginFormProps } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (e: FormData) => {
    try {
      await authenticate(e);
      const session = await getSession();
      if (session?.token && session?.user) {
        if (loginFormProps.callbackAction !== undefined) {
          loginFormProps.callbackAction(session.token, session.userInfos?.['@id']);
        } else {
          const url = new URLSearchParams(new URL(window.location.href).search);
          const callbackUrl = url.get('callbackUrl');
          if (callbackUrl) router.push(callbackUrl);
        }
      }
      closeLoginModal();
    } catch (error) {
      console.log('Identifiants invalides ==> ', error);
      setError('root', { message: 'Identifiants invalides' });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{loginFormProps.title}</h2>
      <p className={styles.subTitle}>{loginFormProps.message}</p>
      <form className={styles.formContainer} action={onSubmit}>
        {errors.root && <p style={{ color: 'red', alignSelf: 'start' }}>{errors.root.message}</p>}
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
        <Link className={styles.forgetPassword} href={'/forgot-password'} onClick={closeLoginModal}>
          Mot de passe oublié ?
        </Link>
        <Button
          className={styles.submitButton}
          type="submit"
          variant={'contained'}
          size={'large'}
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? <CircularProgress sx={{ color: 'white' }} size={24} /> : 'Se connecter'}
        </Button>
      </form>
      <div className={styles.connectLink}>
        <p>Pas encore membre ? </p>
        <Link href={'/signup'} onClick={closeLoginModal}>
          Créez un compte
        </Link>
      </div>
      <Link
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin`}
        onClick={closeLoginModal}
        replace={true}
      >
        Espace employé
      </Link>
    </div>
  );
}
