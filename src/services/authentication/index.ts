'use server';

import { cookies } from "next/headers";

export const login = async (data: { email: string; password: string }) => {
  const body = {
    username: data.email,
    password: data.password
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login_check`, {
    body: JSON.stringify(body),
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) return false;
  const expires = new Date(Date.now() + 3600 * 1000);
  const results = await response.json();
  cookies().set({
    name: 'jwt',
    value: results.token,
    httpOnly: true,
    path: '/',
    expires: expires
  })
  return true;
};


export const logout = () => {
  cookies().delete('jwt');
  return cookies().has('jwt');
}

