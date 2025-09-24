import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { hasRole } from "@/lib/rbac";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const prisma = new PrismaClient();

  if (!session?.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Enforce admin only
  // @ts-expect-error custom (we added `role` to session.user in callbacks)
  if (!hasRole(session.user.role, "ADMIN")) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Fetch all users and project requests
  try {
    const users = await prisma.user.findMany({});
    const requests = await prisma.projectRequest.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json({ users, requests });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch admin data" });
  }
}
