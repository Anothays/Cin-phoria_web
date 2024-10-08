import { ReservationType } from "@/types/ReservationType";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import fetcher from "../fetcher";


export async function useReservation(id: number) {
  const session = await getSession();
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.token}`, // Exemple de header d'authentification
    },
  };
  return useSWR<ReservationType>(`/api/reservations/${id}`, (url: string) => fetcher(url, requestOptions));
}

export function useReservations() {
  return useSWR<ReservationType>(`/api/reservations`);
}