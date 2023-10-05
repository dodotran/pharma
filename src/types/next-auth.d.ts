import { DefaultSession } from 'next-auth'

// types/next-auth.d.ts
interface User {
  name: string
  email: string
  id: string
  image?: string
  role: string
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession['user'] {
    role: string
  }

  interface User extends DefaultUser {
    role: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string
    email: string
    id: string
    image?: string
    role: string
  }
}
