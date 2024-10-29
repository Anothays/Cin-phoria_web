'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const logout = async () => {
  cookies().delete('jwt');
  revalidatePath('/');
  redirect('/');
}

