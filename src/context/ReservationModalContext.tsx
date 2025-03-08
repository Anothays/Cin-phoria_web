'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { MovieType } from '@/types/MovieType';
import { useMovie } from '@/services/movies';
import { SWRResponse } from 'swr';

type reservationModalContextType = {
  isReservationModalOpen: boolean;
  setReservationModalOpen: Dispatch<SetStateAction<boolean>>;
  contentModal: ReactNode;
  setContentModal: Dispatch<SetStateAction<ReactNode | undefined>>;
  movieData: SWRResponse<MovieType>;
};

export const reservationModalContext = createContext<reservationModalContextType | undefined>(
  undefined,
);

export const ReservationModalContextHandler = ({
  children,
  movieId,
}: {
  children: ReactNode;
  movieId: string;
}) => {
  const [isReservationModalOpen, setReservationModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState<ReactNode | undefined>(undefined);
  const movieData = useMovie(`${movieId}`);

  return (
    <reservationModalContext.Provider
      value={{
        isReservationModalOpen,
        setReservationModalOpen,
        contentModal,
        setContentModal,
        movieData,
      }}
    >
      {children}
    </reservationModalContext.Provider>
  );
};

export const useReservationModalContext = () => {
  const context = useContext(reservationModalContext);
  if (context === undefined)
    throw new Error('useReservationModalContext must be used within a GlobalContextProvider');
  return context;
};
