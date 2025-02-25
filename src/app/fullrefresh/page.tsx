'use client';

import { signOut } from 'next-auth/react';

export default function Page() {
  signOut({
    redirect: true,
    redirectTo: '/login',
  });
}
