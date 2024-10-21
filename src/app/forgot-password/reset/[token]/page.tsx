import NewPasswordForm from '@/containers/ForgotPasswordPage/NewPasswordForm';
import styles from './ResetPassword.module.scss';

export default function Reset({ params }: { params: { token: string } }) {
  return (
    <div className={styles.container}>
      <h1>Définissez un nouveau mot de passe</h1>
      <NewPasswordForm token={params.token} />
    </div>
  );
}
