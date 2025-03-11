'use client';

import { useGlobalContext } from '@/contexts/GlobalContext';
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
  reservation: ReservationType;
  closeRateModal: () => void;
  setReservationState: Dispatch<SetStateAction<ReservationType[]>>;
  reservationsState: ReservationType[];
};

const schema = z.object({
  body: z.string({ message: 'Ce champs est requis' }).min(1, { message: 'Ce champs est requis' }),
});

export default function RateForm({
  reservation,
  closeRateModal,
  setReservationState,
  reservationsState,
}: RateFormPropsType) {
  const { data } = useSession();
  const { openSnackbar, setSnackbarContent } = useGlobalContext();
  const [rate, setRate] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RateForm>({
    resolver: zodResolver(schema),
  });

  const mutateReservationState = () => {
    const reservationsStateCopy = [...reservationsState];
    const index = reservationsStateCopy.findIndex((el) => el.id === reservation.id);
    reservationsStateCopy[index].rate = true;
    setReservationState(reservationsStateCopy);
  };

  const onSubmit = async (formdata: RateForm) => {
    const body = {
      points: rate,
      comment: formdata.body,
      reservationId: reservation.id,
    };
    const movieId = reservation.projectionEvent.movie.id;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/note/${movieId}`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            ['Authorization']: `Bearer ${data?.token}`,
            'content-type': 'application/ld+json',
          },
        },
      );
      console.log(response);
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
      <p className={styles.subTitle}>Partagez-nous votre avis d&apos;après séance</p>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
