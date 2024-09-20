'use client';
import { useGlobalContext } from '@/context/globalContext';
import { login } from '@/services/authentication';
import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './LoginModal.module.scss';

type LoginForm = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email({ message: 'Veuiller renseigner une adresse e-mail valide.' }),
  password: z.string().min(4, { message: 'Le mot de passe doit contenir au moins 4 caractères.' }),
});

export default function LoginForm() {
  const router = useRouter();
  const { closeLoginModal, setIsLogged } = useGlobalContext();
  const {
    register,
    setError,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    const response = await login(getValues());
    if (!response) {
      setError('root', {
        message: 'Identifiants invalides',
      });
      return;
    }
    closeLoginModal();
    setIsLogged(true);
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div onClick={closeLoginModal} className={styles.closeIcon}>
        <CloseIcon />
      </div>
      <h2 className={styles.title}>Content de vous revoir !</h2>
      <p className={styles.subTitle}>Connectez-vous pour accéder à votre compte</p>
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
        <Link className={styles.forgetPassword} href={'/forgot-password'}>
          Mot de passe oublié ?
        </Link>
        <Button type="submit" variant={'contained'} size={'large'}>
          Se connecter
        </Button>
      </form>
      <div className={styles.connectLink}>
        <p>Pas encore membre ? </p>
        <Link href={'/signup'} onClick={closeLoginModal}>
          Créez un compte
        </Link>
      </div>
    </div>
  );
}
