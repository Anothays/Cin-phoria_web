'server only'

import fetcher from "../fetcher";

export default function getTarifs() {
  return fetcher(`/api/ticket_categories`);
}