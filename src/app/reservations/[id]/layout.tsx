import Alert from '@mui/material/Alert';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Alert sx={{ marginTop: '1rem' }} severity="info">
        Passé 5 minutes, vous devrez recommencer votre réservation
      </Alert>
      {children}
    </div>
  );
}
