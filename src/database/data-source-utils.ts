import 'reflect-metadata';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export type EnvReaderFunc = (
  key: string,
  defaultValue?: string,
) => string | undefined;

export const readEnv: EnvReaderFunc = (key: string) => {
  return process.env[key];
};

export const getDataSourceConnectParameters = (envReader: EnvReaderFunc) => {
  return {
    ...(envReader('DB_CONNECTION_STRING')
      ? {
          url: envReader('DB_CONNECTION_STRING'),
        }
      : {
          host: envReader('DB_HOST') ?? 'localhost',
          port: parseInt(envReader('DB_HOST_PORT') ?? '5432'),
          username: envReader('DB_USER') ?? 'postgres',
          password: envReader('DB_PASSWORD') ?? 'postgres',
          database: envReader('DB_NAME') ?? 'postgres',
          ssl: envReader('DB_SSL') ?? false,
        }),
    synchronize:
      envReader('NODE_ENV', 'development') === 'development' ||
      envReader('DB_SYNC', 'false') === 'true',
  };
};

export const getDataSourceOptions = (
  envReader: EnvReaderFunc,
  overrideDataSource?: (envReader: EnvReaderFunc) => Partial<DataSourceOptions>,
): DataSourceOptions => {
  const source = {
    type: 'postgres',
    ...getDataSourceConnectParameters(envReader),
  } as DataSourceOptions;

  return {
    ...source,
    ...(overrideDataSource?.(envReader) ?? ({} as any)),
  };
};
