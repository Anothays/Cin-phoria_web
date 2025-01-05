import LoginForm from '@/containers/LoginModal/LoginForm';
import styles from './Login.module.scss';

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
