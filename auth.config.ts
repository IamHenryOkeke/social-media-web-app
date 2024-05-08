import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCreatePost = nextUrl.pathname.startsWith('/create-post');
      const isOnAuthPage = nextUrl.pathname.startsWith('/signup') || nextUrl.pathname.startsWith('/login');
      if (isOnCreatePost) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;