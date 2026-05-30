import { PrismaClient } from "@prisma/client";

// A single shared Prisma client for the whole app. Reusing one instance avoids
// exhausting the database connection pool (a new client per request would).
const prisma = new PrismaClient();

export default prisma;
