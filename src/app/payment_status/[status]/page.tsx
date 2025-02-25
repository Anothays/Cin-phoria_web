import Alert from '@mui/material/Alert';
import styles from './PaymentStatus.module.scss';
import Link from 'next/link';

export default function page({
  params,
  searchParams,
}: {
  params: { status: 'success' | 'failed' };
  searchParams: { [key: string]: string };
}) {
  const { reservation_id } = searchParams;
  if (params.status === 'success') {
    return (
      <div className={styles.container}>
        <h1>Merci pour votre achat</h1>
        <Alert severity="success">
          Retrouvez vos billets <Link href={`/my_reservations/${reservation_id}`}>ici</Link>{' '}
        </Alert>
      </div>
    );
  }
}
