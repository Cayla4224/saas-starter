// src/pages/api/admin/users.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { hasRole } from "@/lib/rbac"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user) {
    return res.status(401).json({ error: "Not authenticated" })
  }

  // Enforce admin only
  // @ts-expect-error custom (we added `role` to session.user in callbacks)
  if (!hasRole(session.user.role, "ADMIN")) {
    return res.status(403).json({ error: "Forbidden" })
  }

  // ✅ Safe to proceed
  return res.status(200).json({ message: "This is admin-only data" })
}
