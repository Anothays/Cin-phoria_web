import SignupForm from '@/containers/SignupPage/SignupForm';
import styles from './Signup.module.scss';

export default function CustomerSignupForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      <SignupForm />
    </div>
  );
}
