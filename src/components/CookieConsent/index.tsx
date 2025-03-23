'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { acceptUserCookieConsent, CookiePreferences, getCookiePreferences } from '@/lib/cookie';
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './CookieConsent.module.scss';

export default function CookieModal() {
  const { isCookieModalVisible, setIsCookieModalVisible } = useGlobalContext();
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const initializePreferences = async () => {
      try {
        const savedPreferences = await getCookiePreferences();
        if (savedPreferences) {
          setPreferences(savedPreferences);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des préférences:', error);
      }
    };

    if (isCookieModalVisible) {
      initializePreferences();
    }
  }, [isCookieModalVisible]);

  const handleAcceptAll = async () => {
    setIsLoading(true);
    try {
      const allPreferences: CookiePreferences = {
        essential: true,
        analytics: true,
        marketing: true,
      };
      await acceptUserCookieConsent(allPreferences);
      setPreferences(allPreferences);
      setIsCookieModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de l&apos;enregistrement des préférences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefuseAll = async () => {
    setIsLoading(true);
    try {
      const minimalPreferences: CookiePreferences = {
        essential: true,
        analytics: false,
        marketing: false,
      };
      await acceptUserCookieConsent(minimalPreferences);
      setPreferences(minimalPreferences);
      setIsCookieModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de l&apos;enregistrement des préférences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await acceptUserCookieConsent(preferences);
      setIsCookieModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de l&apos;enregistrement des préférences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (type: keyof CookiePreferences) => {
    if (type === 'essential') return;
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Dialog
      open={isCookieModalVisible}
      maxWidth="sm"
      fullWidth
      aria-labelledby="cookie-consent-title"
      className={styles.container}
    >
      <DialogTitle id="cookie-consent-title" className={styles.dialogTitle}>
        Paramètres des cookies
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" paragraph>
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. Certains
          cookies sont essentiels au fonctionnement du site, tandis que d&apos;autres nous aident à
          comprendre comment vous l&apos;utilisez et à personnaliser votre expérience.
        </Typography>

        {showDetails && (
          <Box className={styles.preferences}>
            <Box className={styles.preferenceItem}>
              <Typography variant="subtitle1" component="h4">
                Cookies essentiels
              </Typography>
              <Typography variant="body2">
                Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.
              </Typography>
              <input type="checkbox" checked={preferences.essential} disabled />
            </Box>

            <Box className={styles.preferenceItem}>
              <Typography variant="subtitle1" component="h4">
                Cookies analytiques
              </Typography>
              <Typography variant="body2">
                Nous aident à comprendre comment vous utilisez le site.
              </Typography>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handlePreferenceChange('analytics')}
                disabled={isLoading}
              />
            </Box>

            <Box className={styles.preferenceItem}>
              <Typography variant="subtitle1" component="h4">
                Cookies marketing
              </Typography>
              <Typography variant="body2">
                Permettent de vous proposer des contenus personnalisés.
              </Typography>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handlePreferenceChange('marketing')}
                disabled={isLoading}
              />
            </Box>
          </Box>
        )}

        <Box className={styles.actions}>
          <Button
            variant="outlined"
            onClick={() => setShowDetails(!showDetails)}
            className={styles.detailsButton}
            disabled={isLoading}
          >
            {showDetails ? 'Masquer les détails' : 'Personnaliser'}
          </Button>

          {showDetails ? (
            <Button
              variant="contained"
              onClick={handleSavePreferences}
              className={styles.saveButton}
              disabled={isLoading}
            >
              Enregistrer mes préférences
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleRefuseAll}
                className={styles.refuseButton}
                disabled={isLoading}
              >
                Tout refuser
              </Button>
              <Button
                variant="contained"
                onClick={handleAcceptAll}
                className={styles.acceptButton}
                disabled={isLoading}
              >
                Tout accepter
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
