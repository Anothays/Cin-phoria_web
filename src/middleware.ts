export { auth as middleware } from '@/auth';

export const config = { matcher: ['/my_reservations', '/reservations/:path*'] };