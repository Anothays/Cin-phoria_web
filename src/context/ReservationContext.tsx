'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { ReservationType } from '@/types/ReservationType';

type ReservationContextType = {
  reservation: ReservationType | undefined;
  setReservation: Dispatch<SetStateAction<ReservationType | undefined>>;
};

export const ReservationContextHandler = ({
  children,
  reservationProps,
}: {
  children: ReactNode;
  reservationProps: ReservationType | undefined;
}) => {
  const [reservation, setReservation] = useState<ReservationType | undefined>(reservationProps);

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('useReservationContext must be used within a GlobalContextProvider');
  return context;
};
