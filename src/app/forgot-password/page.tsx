import PasswordForgotForm from '@/containers/ForgotPasswordPage/ForgotPasswordFom';
import styles from './PasswordForgot.module.scss';

export default function page() {
  return (
    <div className={styles.container}>
      <h1>Réinitialisation du mot de passe</h1>
      <p>
        Renseignez l'adresse email à laquelle doit être envoyé le lien de réinitialisation du mot de
        passe
      </p>
      <PasswordForgotForm />
    </div>
  );
}
