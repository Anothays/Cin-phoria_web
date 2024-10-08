import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/', // Redirige vers la page d'accueil si non authentifié
  },
});

// Définissez les routes protégées
export const config = {
  matcher: ['/reservations/:path*'], // Protéger toutes les routes sous /reservations
};
