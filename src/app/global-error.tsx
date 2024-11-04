'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Une erreur s&apos;est produite !</h2>
        <button onClick={() => reset()}>Réessayer</button>
      </body>
    </html>
  );
}
