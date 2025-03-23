// pages/conditions-generales.tsx

import Link from 'next/link';
import styles from './cgv.module.scss';

export default function ConditionOfSales() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Conditions Générales de Vente</h1>

      <section className={styles.section}>
        <h2>1. Introduction</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations entre Cinéphoria
          et ses utilisateurs. En utilisant notre site, vous acceptez sans réserve les conditions
          énoncées ci-dessous. Ces CGV sont susceptibles d&apos;être modifiées ou mises à jour, et
          nous vous invitons à les consulter régulièrement pour en prendre connaissance.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Identité de l&apos;entreprise</h2>
        <p>
          <strong>Nom de l&apos;entreprise</strong> : Cinéphoria
        </p>
        <p>
          <strong>Siège social</strong> : 1170 Av. de Saint-Germain, Plaisir
        </p>
        <p>
          <strong>Email</strong> :{' '}
          <Link href="mailto:cinephoria@jeremysnnk.ovh">cinephoria@jeremysnnk.ovh</Link>
        </p>
        <p>
          <strong>Numéro de téléphone</strong> : 0123456789
        </p>
        <p>
          <strong>Numéro d’immatriculation au RCS</strong> : 123 456 789 RCS Plaisir
        </p>
        <p>
          <strong>Numéro de TVA intracommunautaire</strong> : FR12345678901
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Produits et services</h2>
        <p>
          Cinéphoria propose la vente de billets de cinéma pour des séances de films.
          L&apos;utilisateur peut effectuer sa réservation en ligne ou sur place. En ligne, il a la
          possibilité de choisir ses sièges à l’avance, y compris des sièges adaptés aux personnes à
          mobilité réduite. Les billets sont envoyés par email et peuvent être retrouvés dans
          l’espace « Mes réservations » de l’utilisateur. Chaque billet contient un QR code à usage
          unique pour l&apos;accès à la séance réservée.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Processus de commande</h2>
        <p>
          Pour passer une commande, l’utilisateur doit cliquer sur une séance de son choix. Il
          dispose de 5 minutes pour choisir les sièges, les tarifs, puis procéder au paiement via{' '}
          <strong>
            <Link href="https://stripe.com/fr">Stripe</Link>
          </strong>
          . Passé ce délai, les places seront libérées et l&apos;utilisateur devra recommencer le
          processus de réservation.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Tarifs et paiement</h2>
        <p>
          Les tarifs des billets sont définis par l’administration de Cinéphoria et sont soumis à
          trois catégories de prix par défaut : « Moins de 14 ans », « Tarif normal », et « Étudiant
          scolaire ». Le paiement des billets se fait exclusivement par carte bancaire via le
          service sécurisé{' '}
          <strong>
            <Link href="https://stripe.com/fr">Stripe</Link>
          </strong>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Livraison et accès</h2>
        <p>
          L&apos;utilisateur peut réserver à tout moment pour une séance n&apos; non commencée. Une
          fois la réservation effectuée et payée, les billets seront envoyés par email et
          disponibles dans l’espace « Mes réservations ».
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Droit de rétractation</h2>
        <p>
          En raison de la nature des services fournis (billets de cinéma), il n’y a pas de droit de
          rétractation applicable. Une fois le paiement effectué et la réservation confirmée,
          l&apos;utilisateur ne peut annuler ou modifier sa commande.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Responsabilité</h2>
        <p>
          Cinéphoria ne peut être tenu responsable en cas de défaillance technique, de retard ou
          d&apos;incident imprévu affectant l&apos;accès à nos services. L&apos;utilisateur est
          responsable de la saisie correcte des informations lors de la réservation.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Modifications des CGV</h2>
        <p>
          Cinéphoria se réserve le droit de modifier les présentes Conditions Générales de Vente à
          tout moment. Toute modification sera publiée sur cette page et sera considérée comme
          effective dès sa publication. Nous vous encourageons à consulter régulièrement cette page
          pour prendre connaissance des mises à jour. Votre utilisation continue du site après la
          publication des modifications constitue votre acceptation des nouvelles conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Loi applicable et règlement des litiges</h2>
        <p>
          Les présentes Conditions Générales de Vente sont soumises à la législation française. En
          cas de litige, les parties s&apos;efforceront de résoudre le différend à l&apos;amiable.
          Si aucune solution amiable n’est trouvée, les tribunaux compétents seront ceux du ressort
          du siège social de Cinéphoria.
        </p>
      </section>
    </div>
  );
}
