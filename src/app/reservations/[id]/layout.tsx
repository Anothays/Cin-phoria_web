export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <p style={{ paddingTop: '1rem', textAlign: 'center' }}>
        Passé 5 minutes, vous devrez recommencer votre réservation
      </p>
    </div>
  );
}
