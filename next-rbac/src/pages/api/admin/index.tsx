// src/pages/admin/index.tsx
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

type Props = { email: string }

export default function AdminPage({ email }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {email}</p>
    </main>
  )
}

// ✅ SSR function runs before rendering
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  // 1. Not signed in → send to login
  if (!session?.user) {
    return {
      redirect: { destination: "/auth/signin", permanent: false },
    }
  }

  // 2. Wrong role → kick them out
  // @ts-expect-error we added role in callbacks
  if (session.user.role !== "ADMIN") {
    return {
      redirect: { destination: "/", permanent: false },
    }
  }

  // 3. Valid admin → fetch any data you need
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { email: true },
  })

  return {
    props: { email: user?.email ?? "" },
  }
}
