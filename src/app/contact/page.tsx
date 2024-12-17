import ContactForm from '@/containers/ContactPage/ContactForm';
import styles from './Contact.module.scss';

export default async function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contacter notre service</h1>
      <ContactForm />
    </div>
  );
}
