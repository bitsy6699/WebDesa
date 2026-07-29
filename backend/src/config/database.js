import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

function buildDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return url;

  const hasPgbouncer = url.includes('pgbouncer=');
  const hasConnectionLimit = url.includes('connection_limit=');

  if (hasPgbouncer && hasConnectionLimit) return url;

  const separator = url.includes('?') ? '&' : '?';
  const params = [];
  if (!hasPgbouncer) params.push('pgbouncer=true');
  if (!hasConnectionLimit) params.push('connection_limit=1');
  return `${url}${separator}${params.join('&')}`;
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: buildDatabaseUrl(),
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
globalForPrisma.prisma = prisma;

connectWithRetry(prisma).catch((err) => {
  console.error('Gagal konek ke database setelah beberapa percobaan:', err.message);
});

export default prisma;
