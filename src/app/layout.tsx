import CustomSnackbar from '@/components/CustomSnackbar';
import Footer from '@/containers/Footer';
import Header from '@/containers/Header';
import LoginModal from '@/containers/LoginModal';
import classnames from 'classnames';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import styles from './HomePage.module.scss';
import CookieConsent from '@/components/CookieConsent';
import { getUserCookieConsent } from '@/lib/cookie';
import AllContextProvider from "@/contexts/AllContextProvider";

export const metadata: Metadata = {
  title: 'Cinéphoria',
  description:
    "Découvrez les dernières sorties de films, les événements exclusifs et les meilleures expériences cinématographiques avec Cinéphoria. Réservez vos billets en ligne et profitez de nos salles confortables et de notre technologie de pointe. Plongez dans l'univers du cinéma avec nous !",
};

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie_consent = await getUserCookieConsent();

  return (
    <html lang="fr">
      <body className={classnames(font.className, styles.layoutContainer)}>
        <AllContextProvider>
          <LoginModal />
          <CookieConsent cookie_consent={cookie_consent} />
          <CustomSnackbar />
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </AllContextProvider>
      </body>
    </html>
  );
}
