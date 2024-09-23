import { RepositoryFactoryInterface } from '../src/shared/application/interfaces/repositoryFactory.interface';
import { RepositoryFactory } from '../src/shared/infrastructure/factories/repository.factory';
import { RepositoryInterface } from '../src/shared/application/interfaces/repository.interface';

describe('RepositoryFactory', () => {
  let repositoryFactory: RepositoryFactoryInterface;
  const mockRepository: RepositoryInterface<any> = {
    findAll: jest.fn(),
  };

  beforeEach(() => {
    repositoryFactory = new RepositoryFactory();
  });

  it('should implement RepositoryFactoryInterface', () => {
    expect(repositoryFactory).toHaveProperty('createRepository');
    expect(repositoryFactory).toHaveProperty('registerDomain');
  });

  it('should register a domain and allow repository creation', () => {
    const MockRepositoryConstructor = jest.fn(() => mockRepository);

    repositoryFactory.registerDomain('Test', MockRepositoryConstructor);

    const createdRepository = repositoryFactory.createRepository('Test');

    expect(MockRepositoryConstructor).toHaveBeenCalledTimes(1);
    expect(createdRepository).toBe(mockRepository);
  });

  it('should throw an error when trying to create a repository for an unregistered domain', () => {
    expect(() => repositoryFactory.createRepository('FakeTest')).toThrow();
  });

  it('should not create a new instance if one already exists', () => {
    const MockRepositoryConstructor = jest.fn(() => mockRepository);

    repositoryFactory.registerDomain('Test', MockRepositoryConstructor);

    const createdRepository = repositoryFactory.createRepository('Test');
    const createdRepository2 = repositoryFactory.createRepository('Test');

    expect(MockRepositoryConstructor).toHaveBeenCalledTimes(1);
    expect(createdRepository).toBe(mockRepository);
    expect(createdRepository2).toBe(mockRepository);
  });
});
