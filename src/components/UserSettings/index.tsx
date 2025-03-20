'use client';

import { UserType } from '@/types/UserType';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ConfirmDeleteAccountDialog from './ConfirmDeleteAccountDialog';
import UserInfosForm from './UserInfosForm';
import styles from './UserSettings.module.scss';

type UserSettingsProps = {
  userInfos: UserType;
  token: string;
};

export default function UserSettings({ userInfos }: UserSettingsProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box className={styles.container}>
      {!isEditing ? (
        <Box>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Prénom
              </Typography>
              <Typography>{userInfos.firstname}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nom
              </Typography>
              <Typography>{userInfos.lastname}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{userInfos.email}</Typography>
            </Box>
            <Box className={styles.actions}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                className={styles.updateButton}
              >
                Modifier mes informations
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenDialog(true)}
                className={styles.deleteButton}
              >
                Supprimer mon compte
              </Button>
            </Box>
          </Stack>
        </Box>
      ) : (
        <UserInfosForm setIsEditing={setIsEditing} />
      )}

      <ConfirmDeleteAccountDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
}
