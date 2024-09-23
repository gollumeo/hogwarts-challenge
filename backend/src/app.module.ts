import { Module } from '@nestjs/common';
import { RepositoryFactory } from './shared/infrastructure/factories/repository.factory';
import { repositoriesConfig } from './shared/infrastructure/config/repositories.config';

@Module({
  providers: [
    {
      provide: RepositoryFactory,
      useFactory: () => {
        const factory = new RepositoryFactory();

        // Dynamic repositories registration from config
        Object.keys(repositoriesConfig).forEach((domain) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          factory.registerDomain(domain, repositoriesConfig[domain]);
        });

        return factory;
      },
    },
  ],
  exports: [RepositoryFactory],
})
export class AppModule {}
