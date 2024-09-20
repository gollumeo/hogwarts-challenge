import { RepositoryFactoryInterface } from '../src/shared/application/interfaces/repositoryFactory.interface';
import { RepositoryFactory } from '../src/shared/infrastructure/factories/repository.factory';
import { RepositoryInterface } from '../src/shared/application/interfaces/repository.interface';

describe('RepositoryFactory', () => {
  let repositoryFactory: RepositoryFactoryInterface;
  type GenericEntity = { id: number; name: string };

  beforeEach(() => {
    repositoryFactory = new RepositoryFactory();
  });

  describe('createRepository', () => {
    it('implements the RepositoryFactory interface', () => {
      const repositoryFactory: RepositoryFactoryInterface =
        new RepositoryFactory();

      expect(repositoryFactory).toHaveProperty('createRepository');

      expect(typeof repositoryFactory.createRepository).toBe('function');
    });

    it('creates/instantiates and returns a domain-based repository', () => {
      const mockRepository: jest.Mocked<RepositoryInterface<GenericEntity>> = {
        findAll: jest.fn(),
      };

      const mockConstructor = jest.fn(() => mockRepository);

      const createdRepository =
        repositoryFactory.createRepository<RepositoryInterface<GenericEntity>>(
          mockConstructor,
        );

      expect(createdRepository).toBe(mockRepository);
    });

    it('throws an error when the domain does not exist', () => {
      //
    });

    it('has the correct methods', () => {
      //
    });
  });
});
