export interface RepositoryFactoryInterface {
  createRepository<T>(entity: new () => T): T;
}
