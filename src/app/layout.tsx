import Footer from '@/containers/Footer';
import Header from '@/containers/Header';
import LoginModal from '@/containers/LoginModal';
import { GlobalContextHandler } from '@/context/globalContext';
import classnames from 'classnames';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import styles from './page.module.css';
import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Cinéphoria',
  description:
    "Découvrez les dernières sorties de films, les événements exclusifs et les meilleures expériences cinématographiques avec Cinéphoria. Réservez vos billets en ligne et profitez de nos salles confortables et de notre technologie de pointe. Plongez dans l'univers du cinéma avec nous !",
};

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={classnames(font.className, styles.layoutContainer)}>
        <GlobalContextHandler>
          <Providers>
            <LoginModal />
            <Header />
            {children}
            <Footer />
          </Providers>
        </GlobalContextHandler>
      </body>
    </html>
  );
}
