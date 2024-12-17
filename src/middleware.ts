export { auth as middleware } from '@/auth';

export const config = { matcher: ['/my_reservations', '/reservations/:path*'] };


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getSession } from '@/auth/hook';
// import jwt from 'jsonwebtoken';
//
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const session = await getSession();
//   const token = session?.token ?? '';
//   const paylod = jwt.decode(token);
//   // console.log(session, paylod);
//   if (!session?.token) {
//     return NextResponse.redirect(new URL('/fullrefresh', request.url));
//   }
// }
//
// export const config = {
//   matcher: ['/reservations/:path*', '/my_reservations'],
// };
