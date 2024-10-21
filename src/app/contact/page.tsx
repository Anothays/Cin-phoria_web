import ContactForm from '@/containers/ContactPage/ContactForm';
import styles from './Contact.module.scss';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1>Contacter notre service</h1>
      <ContactForm />
    </div>
  );
}