import { ApiJSONResponseType } from "@/types/ApiResponseType";
import useSWR from "swr";



export function useTicketCategories() {
  return useSWR<ApiJSONResponseType>(`/api/ticket_categories`);
}