import db from '@/client';

export const getVerificationTokenByEmail = async(email: string) => {
  try {
    const data = await db.verificationToken.findFirst({
      where: {
        email: email
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch token:', error);
    return null
  }
}

export const getVerificationTokenByToken = async(token: string) => {
  try {
    const data = await db.verificationToken.findFirst({
      where: {
        token: token
      }
    })
    return data;
  } catch (error) {
    console.error('Failed to fetch token:', error);
    return null
  }
}