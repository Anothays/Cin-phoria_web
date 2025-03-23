import Link from 'next/link';
import styles from './PrivacyPolicy.module.scss';

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Politique de confidentialité</h1>
      <p className={styles.introduction}>
        Chez <strong>Cinéphoria</strong>, nous nous engageons à protéger et à respecter la vie
        privée de nos utilisateurs. Cette politique de confidentialité explique comment nous
        collectons, utilisons, partageons et protégeons vos informations personnelles lorsque vous
        utilisez notre site web.
      </p>

      <h2>1. Collecte des données personnelles</h2>
      <p>
        Lorsque vous créez un compte sur notre site, nous collectons les informations suivantes :
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse e-mail</li>
          <li>Mot de passe (qui est stocké de manière sécurisée et hachée)</li>
        </ul>
        En outre, si vous effectuez un achat, nous utilisons le service de paiement{' '}
        <strong>
          <Link href="https://stripe.com/fr">Stripe</Link>
        </strong>{' '}
        pour traiter vos transactions. Notez que nous ne collectons ni ne stockons vos informations
        de paiement, telles que vos informations bancaires ou cartes de crédit, car celles-ci sont
        gérées directement par{' '}
        <strong>
          <Link href="https://stripe.com/fr">Stripe</Link>
        </strong>{' '}
        via sa page auto-hébergée &quot;Checkout&quot;. Nous conservons uniquement des informations
        concernant le nombre de billets vendus et les recettes générées. Nous utilisons également
        des cookies pour gérer votre session avec <strong>NextAuth</strong>, un service
        d&apos;authentification. Ces cookies sont essentiels au bon fonctionnement de notre site.
      </p>

      <h2>2. Utilisation des données</h2>
      <p>
        Nous collectons vos données personnelles pour la gestion de vos commandes et réservations,
        ainsi que pour l&apos;amélioration de nos services, et pour de l&apos;analyse statistique et
        marketing. La collecte et le traitement de vos données personnelles reposent sur votre
        consentement explicite lorsque vous arrivez sur le site web, et lors de la création de votre
        compte, ainsi que pour l&apos;exécution des services que nous vous offrons (réservations,
        achats de billets).
      </p>

      <h2>3. Partage des données</h2>
      <p>
        Nous nous engageons à ne partager vos informations personnelles avec des tiers, à
        l&apos;exception de{' '}
        <strong>
          <Link href="https://stripe.com/fr">Stripe</Link>
        </strong>{' '}
        qui traite les paiements via son propre système sécurisé. Nous ne transférons aucune donnée
        à l&apos;étranger.
      </p>

      <h2>4. Durée de conservation des données</h2>
      <p>
        Nous conservons vos données personnelles tant que votre compte est actif. Si vous souhaitez
        supprimer votre compte, vous pouvez le faire en envoyant une demande par e-mail à
        l&apos;adresse mentionnée en bas de cette page. Lorsque vous supprimez votre compte, vos
        informations seront effacées conformément à la réglementation applicable, à l&apos;exception
        des données financières nécessaires à la gestion des transactions.
      </p>

      <h2>5. Droits des utilisateurs</h2>
      <p>
        En tant qu&apos;utilisateur, vous disposez des droits suivants concernant vos données
        personnelles :
        <ul>
          <li>
            <strong>Accès</strong> : Vous pouvez consulter vos réservations directement dans votre
            espace utilisateur.
          </li>
          <li>
            <strong>Modification</strong> : Actuellement, pour modifier vos informations
            personnelles, vous devez nous envoyer un email à l&apos;adresse renseignée en bas de
            page. Nous prévoyons bientôt de rendre cette fonctionnalité disponible directement
            depuis votre espace personnel.
          </li>
          <li>
            <strong>Suppression</strong> : Vous pouvez demander la suppression de vos données
            personnelles à tout moment en nous contactant par e-mail.
          </li>
          <li>
            <strong>Retrait du consentement</strong> : Vous pouvez retirer votre consentement à tout
            moment, ce qui entraînera la désactivation de votre compte, tout en respectant nos
            obligations légales.
          </li>
        </ul>
      </p>

      <h2>6. Sécurisation des données</h2>
      <p>
        Nous prenons la sécurité de vos données personnelles très au sérieux. Voici les mesures
        mises en place :
        <ul>
          <li>
            <strong>Hachage des mots de passe</strong> : Vos mots de passe sont sécurisés par un
            algorithme de hachage, ce qui empêche toute exposition de vos informations sensibles.
          </li>
          <li>
            <strong>HTTPS</strong> : Toutes les communications entre vous et notre site sont
            sécurisées par HTTPS pour garantir la confidentialité des échanges.
          </li>
        </ul>
      </p>

      <h2>7. Utilisation des cookies</h2>
      <p>
        Nous utilisons des cookies essentiels au fonctionnement du site. Ces cookies permettent de
        garantir la session utilisateur et d&apos;assurer la sécurité de votre compte (notamment
        avec NextAuth). Nous utilisons aussi des cookies pour de l&apos;analyse statistique et
        marketing. Nous ne procédons pas à l&apos;enregistrment de vos données personnels dans ces
        cookies sans votre consentement.
      </p>

      <h2>8. Informations de contact</h2>
      <p>
        Si vous avez des questions ou des préoccupations concernant cette politique de
        confidentialité, ou si vous souhaitez exercer vos droits, vous pouvez nous contacter via ce
        formulaire :
        <ul>
          <li>
            <strong>
              Formulaire de contact : <Link href={'/contact'}>Cliquez-ici</Link>
            </strong>
            .
          </li>
          <li>
            <strong>
              Téléphone: <a href="tel:0123456789">0123456789</a>{' '}
            </strong>
          </li>
          <li>
            <strong>E-mail</strong> :{' '}
            <a href={`mailto:${process.env.CINEPHORIA_EMAIL}`}>{process.env.CINEPHORIA_EMAIL}</a>
          </li>
        </ul>
      </p>
    </div>
  );
}
