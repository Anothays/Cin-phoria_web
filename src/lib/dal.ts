import 'server-only';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const verifySession = () => {
  if (!cookies().has('jwt')) return false;
  const token = cookies().get('jwt');
  if (!token) return false;

  const publicKeyPath = path.join(process.cwd(), process.env.JWT_PUBLIC_KEY!);
  const publicKey = readFileSync(publicKeyPath, 'utf8');

  try {
    const decoded = jwt.verify(token.value, publicKey, { algorithms: ['RS256'] });
    if (!decoded) return false;
    return true;
  } catch (error) {
    console.error('Erreur de vérification du token : ', error);
    return false;
  }
};
