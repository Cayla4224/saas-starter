// src/pages/index.tsx
import { Inter } from "next/font/google"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6`}
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Next.js RBAC Demo
        </h1>

        <p className="text-center text-gray-600">
          Status: <span className="font-medium">{status}</span>
        </p>

        {session ? (
          <div className="space-y-4">
            <p className="text-center text-green-600">
              Signed in as{" "}
              <span className="font-semibold">{session.user?.email}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign in
          </button>
        )}

        <div className="text-center">
          <Link
            href="/admin"
            className="text-blue-500 hover:underline font-medium"
          >
            Go to Admin Page
          </Link>
        </div>
      </div>
    </main>
  )
}

