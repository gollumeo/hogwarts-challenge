import { RepositoryFactoryInterface } from '../../application/interfaces/repositoryFactory.interface';
import { RepositoryInterface } from '../../application/interfaces/repository.interface';

export class RepositoryFactory implements RepositoryFactoryInterface {
  private constructors: Map<string, new () => RepositoryInterface<any>> =
    new Map();
  private instances: Map<string, RepositoryInterface<any>> = new Map();

  registerDomain<T>(
    domainName: string,
    repositoryConstructor: new () => RepositoryInterface<T>,
  ): void {
    this.constructors.set(domainName, repositoryConstructor);
  }

  createRepository<T>(domainName: string): RepositoryInterface<T> {
    this.ensureInstanceExists(domainName);
    return this.getInstance(domainName);
  }

  private ensureInstanceExists(domaineName: string): void {
    if (!this.instances.has(domaineName)) {
      const instance = this.createNewInstance(domaineName);
      this.instances.set(domaineName, instance);
    }
  }
  private createNewInstance(domainName: string): RepositoryInterface<any> {
    const Constructor = this.getConstructor(domainName);
    return new Constructor();
  }

  private getConstructor(
    domainName: string,
  ): new () => RepositoryInterface<any> {
    const Constructor = this.constructors.get(domainName);
    if (!Constructor) {
      throw new Error(`Domain ${domainName} not registered`);
    }
    return Constructor;
  }

  private getInstance(domainName: string): RepositoryInterface<any> {
    const instance = this.instances.get(domainName);
    if (!instance) {
      throw new Error(`Instance for ${domainName} not found`);
    }
    return instance;
  }
}
