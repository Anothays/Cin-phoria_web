'use client';

import { useGlobalContext } from '@/context/globalContext';
import { ReservationType } from '@/types/ReservationType';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './LoginForm.module.scss';

type RateForm = {
  rate: number;
  body: string;
  setReservationState: () => void;
};
type RateFormPropsType = {
  reservationId: number | undefined;
  closeRateModal: () => void;
  setReservationState: Dispatch<SetStateAction<ReservationType[]>>;
  reservationsState: ReservationType[];
};

const schema = z.object({
  body: z.string({ message: 'Ce champs est requis' }).min(1, { message: 'Ce champs est requis' }),
});

export default function RateForm({
  reservationId,
  closeRateModal,
  setReservationState,
  reservationsState,
}: RateFormPropsType) {
  const { data } = useSession();
  const { openSnackbar, setSnackbarContent } = useGlobalContext();
  const [rate, setRate] = useState<number | null>(null);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RateForm>({
    resolver: zodResolver(schema),
  });

  const mutateReservationState = () => {
    const reservationsStateCopy = [...reservationsState];
    const index = reservationsStateCopy.findIndex((el) => el.id === reservationId);
    reservationsStateCopy[index].rate = true;
    setReservationState(reservationsStateCopy);
  };

  const onSubmit = async (formdata) => {
    if (!reservationId) return;
    const body = {
      points: rate,
      comment: formdata.body,
      reservationId,
    };
    try {
      const response = await fetch('http://localhost:8000/api/movies/rate', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          ['Authorization']: `Bearer ${data?.token}`,
        },
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      openSnackbar();
      setSnackbarContent('Votre avis a été pris en compte');
      mutateReservationState();
    } catch (error) {
      alert(`${error}`);
    }
    closeRateModal();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Votre avis</h2>
      <p className={styles.subTitle}>Partagez-nous votre avis d'après séance</p>
      <form className={styles.formContainer} action={handleSubmit(onSubmit)}>
        {errors.root && <p style={{ color: 'red', alignSelf: 'start' }}>{errors.root.message}</p>}
        <Rating
          name="Rate"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
        />

        <TextField
          {...register('body', { required: true })}
          label="Votre avis"
          variant={'outlined'}
          type={'text'}
          fullWidth={true}
          error={!!errors.body}
          helperText={errors.body?.message}
          multiline
          rows={5}
        />
        <Button type="submit" variant={'contained'} size={'large'}>
          Soumettre
        </Button>
      </form>
    </div>
  );
}