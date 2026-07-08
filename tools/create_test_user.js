const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const username = 'tester@example.com'
  const password = 'Tester123!'

  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) {
    console.log('User already exists:', username)
    return
  }

  const hashed = bcrypt.hashSync(password, 10)
  const user = await prisma.user.create({ data: { username, password: hashed, name: 'Test User' } })
  console.log('Created user:', username, 'password:', password)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
