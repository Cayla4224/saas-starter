import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const password = 'Password123!'
  const passwordHash = await bcrypt.hash(password, 10)

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Admin User',
      email,
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log('Seeded admin:', { email, password })
}

main().finally(() => prisma.$disconnect())
