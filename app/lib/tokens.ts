import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from './verification-token';
import db from '@/client';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + (3600 * 1000))

  const existingToken = await getVerificationTokenByEmail(email)
  console.log(existingToken)
  if(existingToken) {
    await db.verificationToken.delete({
      where: {
        token: existingToken.token
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token: token,
      email: email,
      expires: expires
    }
  });

  return verificationToken;
}