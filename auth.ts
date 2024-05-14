import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { getUserByEmail } from './app/lib/data';
import { LoginSchema } from './app/lib/zod-schema';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user: any = await getUserByEmail(email.toLowerCase());
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({user, account}) {
      const existingUser:any = await getUserByEmail(user?.email)

      if (!existingUser?.emailVerifed) return false

      return true
    },
    async jwt({token}) {
      return token
    },
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  },
});