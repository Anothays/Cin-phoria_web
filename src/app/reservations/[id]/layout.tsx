import { ReactNode } from 'react';
import { ReservationContextHandler } from '@/context/ReservationContext';
import { auth } from '@/auth';
import fetcher from '@/services/fetcher';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: number };
}) {
  const session = await auth();

  const response = await fetcher(`/api/reservations/${params.id}`, {
    headers: { Authorization: `Bearer ${session?.token}` },
  });
  if (response.status && response.status === 404) return redirect('/');
  if (response.paid) return redirect('/');

  return (
    <ReservationContextHandler reservationProps={response}>
      <div>{children}</div>
    </ReservationContextHandler>
  );
}
