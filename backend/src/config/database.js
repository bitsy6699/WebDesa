import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

async function connectWithRetry(prisma, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((r) => setTimeout(r, RETRY_DELAY * attempt));
    }
  }
}

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

connectWithRetry(prisma).catch((err) => {
  console.error('Gagal konek ke database setelah beberapa percobaan:', err.message);
});

export default prisma;
