import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseModule, defaultDataSource } from 'src/database';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';

export class GlobalProviders {
  static forRoot(): DynamicModule {
    return {
      module: GlobalProviders,
      global: true,
      imports: [ConfigModule],
    };
  }
}

@Module({
  imports: [
    GlobalProviders.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRootAsync({
      global: true,
      useFactory: async () => {
        return {
          options: () => defaultDataSource,
        };
      },
    }),
    StudentsModule,
  ],
})
export class AppModule {}
