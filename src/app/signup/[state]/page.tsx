import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from 'next/link';
import styles from './SignupState.module.scss';

export default function page({ params }: { params: { state: 'success' | 'error' } }) {
  return (
    <div className={styles.page}>
      {params.state === 'success' ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <h1>Votre compte a bien été crée ! Bienvenue</h1>
          <Link className={styles.link} href="/login">Se connecter</Link>
        </Alert>
      ) : (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <h1>Une erreur s'est produite</h1>
        </Alert>
      )}
    </div>
  );
}
