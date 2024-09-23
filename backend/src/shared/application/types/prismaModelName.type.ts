import { PrismaClient } from '@prisma/client';

export type PrismaModelName = keyof PrismaClient & string;
