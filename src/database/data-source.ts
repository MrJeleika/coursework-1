import { getDataSourceOptions, readEnv } from 'src/database/data-source-utils';
import { StudentEntity } from './entities';

export const defaultDataSource = getDataSourceOptions(readEnv, () => ({
  entities: [StudentEntity],
}));
