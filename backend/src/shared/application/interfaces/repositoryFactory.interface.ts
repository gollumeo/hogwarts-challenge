import { RepositoryInterface } from './repository.interface';

export interface RepositoryFactoryInterface {
  createRepository<T>(domainName: string): RepositoryInterface<T>;
  registerDomain<T>(
    domainName: string,
    repositoryConstructor: new () => RepositoryInterface<T>,
  ): void;
}
