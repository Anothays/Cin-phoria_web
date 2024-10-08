export default function page({ params }: { params: { status: boolean } }) {
  return (
    <div>
      <h1>{params.status ? 'Merci pour votre achat' : 'Erreur lors du paiement'}</h1>
    </div>
  );
}
