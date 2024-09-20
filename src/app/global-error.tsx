'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Une erreur s'est produite !</h2>
        <button onClick={() => reset()}>Réessayer</button>
      </body>
    </html>
  );
}
