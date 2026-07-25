import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'password123';

  const hashedPassword = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log(`User "${username}" sudah ada. Lewati.`);
    return;
  }

  await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  console.log(`User "${username}" berhasil dibuat.`);
  console.log(`Login: POST /api/v1/auth/login`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
