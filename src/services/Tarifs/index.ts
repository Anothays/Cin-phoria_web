import { ApiJSONResponseType } from "@/types/ApiResponseType";
import { TicketCategoryType } from "@/types/TicketCategoryType";
import useSWR from "swr";

export function useTicketCategories() {
  return useSWR<ApiJSONResponseType<TicketCategoryType>>(`/api/ticket_categories`);
}

