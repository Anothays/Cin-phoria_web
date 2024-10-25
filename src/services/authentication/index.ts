'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (data: Record<"email" | "password", string> | undefined) => {
  const body = {
    username: data?.email,
    password: data?.password
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login_check`, {
      body: JSON.stringify(body),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error("Erreur d'authentification");
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    throw error
  }


  // const expires = new Date(Date.now() + 3600 * 1000);
  // cookies().set({
  //   name: 'jwt',
  //   value: results.token,
  //   httpOnly: true,
  //   path: '/',
  //   expires: expires
  // })
  // return true;
};


export const logout = async () => {
  cookies().delete('jwt');
  revalidatePath('/');
  redirect('/');
}

