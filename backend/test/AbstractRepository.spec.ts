import { PrismaRepository } from '../src/shared/infrastructure/repositories/abstractPrisma.repository';
import { PrismaClient } from '@prisma/client';
import { PrismaModelName } from '../src/shared/application/types/prismaModelName.type';

// Définir un type pour les méthodes mockées de Prisma
type MockedPrismaMethod = jest.Mock & { mockResolvedValue: jest.Mock };

// Créer un type pour le mock de PrismaClient
type MockedPrismaClient = {
  [K in keyof PrismaClient]: K extends '$transaction'
    ? jest.Mock
    : {
        create: MockedPrismaMethod;
        findUnique: MockedPrismaMethod;
        findMany: MockedPrismaMethod;
        update: MockedPrismaMethod;
        delete: MockedPrismaMethod;
      };
};

// Fonction pour créer une méthode mockée
const createMockedMethod = (): MockedPrismaMethod => {
  const method = jest.fn() as MockedPrismaMethod;
  method.mockResolvedValue = jest.fn();
  return method;
};

// Mock de PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $transaction: jest.fn((callback) => callback()),
    user: {
      create: createMockedMethod(),
      findUnique: createMockedMethod(),
      findMany: createMockedMethod(),
      update: createMockedMethod(),
      delete: createMockedMethod(),
    },
  })),
}));

class TestUserRepository<T> extends PrismaRepository<T> {
  protected readonly modelName: PrismaModelName = 'user';
}

describe('AbstractRepository', () => {
  let repository: TestUserRepository<{ id: number; name: string }>;
  let prismaClient: MockedPrismaClient;

  beforeEach(() => {
    prismaClient = new PrismaClient() as unknown as MockedPrismaClient;
    repository = new TestUserRepository();
    (repository as any).prisma = prismaClient;
  });

  it('should create an entity', async () => {
    const data = { name: 'Test' };
    prismaClient.user.create.mockResolvedValue({ id: 1, ...data });

    const result = await repository.create(data);

    expect(prismaClient.user.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual({ id: 1, ...data });
  });

  it('should find an entity by id', async () => {
    const id = 1;
    const mockUser = { id, name: 'Test' };
    prismaClient.user.findUnique.mockResolvedValue(mockUser);

    const result = await repository.findById(id);

    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual(mockUser);
  });

  it('should find all entities', async () => {
    const mockUsers = [
      { id: 1, name: 'Test1' },
      { id: 2, name: 'Test2' },
    ];
    prismaClient.user.findMany.mockResolvedValue(mockUsers);

    const result = await repository.findAll();

    expect(prismaClient.user.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should update an entity', async () => {
    const data: Partial<any> = { name: 'Updated' };
    const id: number = 1;
    const updatedUser = { ...data, id };
    prismaClient.user.update.mockResolvedValue(updatedUser);

    const result = await repository.update(data, id);

    expect(prismaClient.user.update).toHaveBeenCalledWith({
      where: { id },
      data,
    });
    expect(result).toEqual(updatedUser);
  });

  it('should delete an entity', async () => {
    const id = 1;
    const deletedUser = { id, name: 'Deleted' };
    prismaClient.user.delete.mockResolvedValue(deletedUser);

    const result = await repository.delete(id);

    expect(prismaClient.user.delete).toHaveBeenCalledWith({ where: { id } });
    expect(result).toEqual(deletedUser);
  });

  it('should use Prisma transactions', async () => {
    await repository.create({ name: 'Test' });
    expect(prismaClient.$transaction).toHaveBeenCalled();
  });
});
