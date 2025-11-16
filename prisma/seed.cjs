const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@play.local' },
    update: {},                          // nothing to update for now
    create: { email: 'admin@play.local', name: 'Admin', role: 'ADMIN' },
  })

  await prisma.tournament.deleteMany()   // clear old demo data (dev only)
  await prisma.tournament.createMany({
    data: [
      {
        title: 'Sunday Cricket Cup',
        description: 'Friendly 6-a-side',
        location: 'Haldwani',
        sportType: 'Cricket',
        startDate: new Date(),
        organizerId: admin.id,
      },
    ],
  })
}

main().catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
