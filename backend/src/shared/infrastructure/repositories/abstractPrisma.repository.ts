import { PrismaClient } from '@prisma/client';
import { PrismaModelName } from '../../application/types/prismaModelName.type';

export abstract class PrismaRepository<T> {
  protected readonly prisma: PrismaClient;
  protected abstract readonly modelName: PrismaModelName;

  constructor() {
    this.prisma = new PrismaClient();
  }

  create(data: Partial<T>): Promise<T> {
    console.log((this.prisma[this.modelName] as any).create({ data }));
    return (this.prisma[this.modelName] as any).create({ data });
  }

  findById(id: number): Promise<T> {
    return (this.prisma[this.modelName] as any).findUnique({ id });
  }

  findAll(): Promise<T[]> {
    return (this.prisma[this.modelName] as any).findAll();
  }

  update(data: Partial<T>, id: number): Promise<T> {
    return (this.prisma[this.modelName] as any).update({
      where: { id },
      data: { data },
    });
  }

  delete(id: number) {
    return (this.prisma[this.modelName] as any).delete({ id });
  }
}
