import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './data-source-utils';
import { assert } from 'console';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
} from './database.module-definition';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  public static forFeature(
    ...options: Parameters<typeof TypeOrmModule.forFeature>
  ) {
    return TypeOrmModule.forFeature(...options);
  }

  public static forRootAsync(
    asyncOptions: typeof ASYNC_OPTIONS_TYPE,
  ): DynamicModule {
    assert(asyncOptions.useFactory, 'useFactory is undefined');

    return {
      ...super.forRootAsync(asyncOptions),
      global: asyncOptions.global,
      exports: [TypeOrmModule],
      imports: [
        ...(asyncOptions.imports ?? []),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          name: asyncOptions.name,
          useFactory: async (configService: ConfigService) => {
            const options = await asyncOptions.useFactory?.(configService);
            return getDataSourceOptions(
              (key: string) => configService.get(key),
              options?.options,
            );
          },
        }),
      ],
    };
  }
}
