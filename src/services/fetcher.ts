

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
// const session = await getSession();
// const initDefault: RequestInit = {
//   headers: {
//     'Authorization': session?.token ? `Bearer ${session.token}` : '',
//   }
// };

const fetcher = (input: string | URL | globalThis.Request, init?: RequestInit, baseUrl: string = BASE_URL) => fetch(`${baseUrl}${input}`, init).then(res => res.json());

export default fetcher;