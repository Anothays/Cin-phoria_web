'use server';

import { cookies } from 'next/headers';

export const acceptUserCookieConsent = async () => {
  cookies().set({
    name: 'cookies_consent',
    value: 'true',
    path: '/',
  });
};

export const getUserCookieConsent = async () => {
  const cookieStore = cookies();
  return cookieStore.get('cookies_consent');
};
