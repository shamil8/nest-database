import './utils/custom-methods-typeorm';

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@app/logger/logger.module';
import { LoggerService } from '@app/logger/services/logger.service';

import { databaseConfig } from './config/database.config';
import { DatabaseLoggerService } from './services/database-logger.service';
import { QueryRunnerService } from './services/query-runner.service';

@Global()
@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, LoggerService],
      useFactory: (config: ConfigService, logger: LoggerService) => ({
        ...databaseConfig(config),
        logger: new DatabaseLoggerService(logger),
      }),
    }),
  ],
  providers: [QueryRunnerService],
  exports: [QueryRunnerService],
})
export class DatabaseModule {}
