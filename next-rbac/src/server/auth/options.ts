import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/password"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user?.passwordHash) return null
        const valid = await verifyPassword(credentials.password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-expect-error custom
        token.role = (user as any).role
      }
      if (!("role" in token) && token.sub) {
        const dbUser = await prisma.user.findUnique({ where: { id: token.sub }, select: { role: true } })
        // @ts-expect-error custom
        token.role = dbUser?.role ?? "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error custom
        session.user.id = token.sub
        // @ts-expect-error custom
        session.user.role = token.role
      }
      return session
    },
  },
}
