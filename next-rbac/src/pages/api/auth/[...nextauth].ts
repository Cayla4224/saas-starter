// src/pages/api/auth/[...nextauth].ts
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/password"
import { z } from "zod"

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authOptions: NextAuthOptions = {
  // Adapter is optional for pure-credentials, but keeping it
  // makes it easy to add OAuth providers later.
  adapter: PrismaAdapter(prisma),

  // Use JWT so middleware can read token without hitting DB
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        const parsed = CredentialsSchema.safeParse(raw)
        if (!parsed.success) return null
        const { email, password } = parsed.data

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, passwordHash: true, role: true },
        })
        if (!user?.passwordHash) return null

        const valid = await verifyPassword(password, user.passwordHash)
        if (!valid) return null

        // Return a minimal object; role will be copied to JWT in callbacks.jwt
        return { id: user.id, email: user.email, name: user.name, role: user.role as any }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    // Add role to JWT so middleware can check it
    async jwt({ token, user }) {
      // On initial sign-in, `user` is defined (from authorize)
      if (user) {
        
        token.role = (user as any).role ?? "USER"
      }

      // If role is still missing (old token), hydrate from DB
      if (!("role" in token) && token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        })
        
        token.role = dbUser?.role ?? "USER"
      }

      return token
    },

    // Expose id & role on the session object for convenience in the app
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error augmenting SessionUser
        session.user.id = token.sub
        // @ts-expect-error custom field
        session.user.role = token.role ?? "USER"
      }
      return session
    },
  },

  // Make sure you have NEXTAUTH_SECRET in .env
  // NEXTAUTH_URL should be set to your dev/prod URL (Codespaces URL in dev)
}

export default NextAuth(authOptions)
