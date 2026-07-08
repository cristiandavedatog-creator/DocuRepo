import NextAuth from 'next-auth'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('NextAuth authorize called with:', credentials)
        if (!credentials) {
          console.log('authorize: missing credentials')
          return null
        }
        const user = await prisma.user.findUnique({ where: { username: credentials.username } })
        if (!user) {
          console.log('authorize: user not found', credentials.username)
          return null
        }
        const ok = await bcrypt.compare(credentials.password, user.password)
        if (!ok) {
          console.log('authorize: invalid password for', credentials.username)
          return null
        }
        console.log('authorize: successful for', credentials.username)
        return { id: user.id, name: user.name || user.username, role: user.role }
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
