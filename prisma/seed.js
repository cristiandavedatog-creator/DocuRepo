const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const categories = ['Memorandum','Administrative','Finance','Human Resources','Forms','Archive']
  for (const name of categories) {
    await prisma.category.upsert({ where: { name }, update: {}, create: { name } })
  }

  const admin = await prisma.user.findUnique({ where: { username: 'admin' } })
  if (!admin) {
    const hashed = bcrypt.hashSync('Admin123!', 10)
    await prisma.user.create({ data: { username: 'admin', password: hashed, name: 'Administrator', role: 'admin' } })
    console.log('Created admin user: admin / Admin123!')
  } else {
    console.log('Admin user already exists')
  }

  console.log('Seeding complete')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
