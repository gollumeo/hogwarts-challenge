import { RepositoryFactoryInterface } from '../../application/interfaces/repositoryFactory.interface';

export class RepositoryFactory implements RepositoryFactoryInterface {
  private repositories: Map<any, any> = new Map<any, any>();

  createRepository<T>(entity: new () => T): T {
    if (!this.repositories.has(entity)) {
      const repository = new (entity as any)();
      this.repositories.set(entity, repository);
    }

    return this.repositories.get(entity);
  }
}
