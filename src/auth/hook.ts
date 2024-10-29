'use server';
import { auth } from '@/auth/index';
import { redirect } from 'next/navigation';

export const getSession = () => {
  return auth();
};

export const getSessionOrLogIn = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect('/login');
  }
  return session;
};