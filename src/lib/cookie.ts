'use server';

import { cookies } from 'next/headers';

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const acceptUserCookieConsent = async (preferences: CookiePreferences) => {
  const cookieStore = cookies();

  // Les cookies essentiels sont toujours acceptés
  cookieStore.set('cookie_consent_essential', 'true', {
    maxAge: 60 * 60 * 24 * 365, // 1 an
    path: '/',
  });

  // Cookies analytiques
  if (preferences.analytics) {
    cookieStore.set('cookie_consent_analytics', 'true', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  } else {
    cookieStore.delete('cookie_consent_analytics');
  }

  // Cookies marketing
  if (preferences.marketing) {
    cookieStore.set('cookie_consent_marketing', 'true', {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
  } else {
    cookieStore.delete('cookie_consent_marketing');
  }

  // Sauvegarde des préférences complètes
  cookieStore.set('cookie_preferences', JSON.stringify(preferences), {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
};

export const getCookiePreferences = async () => {
  const cookieStore = cookies();
  const savedPreferences = cookieStore.get('cookie_preferences');
  if (savedPreferences?.value) return JSON.parse(savedPreferences.value);
  return undefined;
};
