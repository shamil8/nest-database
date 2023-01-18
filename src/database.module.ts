import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from '@app/logger/logger.module';
import { LoggerService } from '@app/logger/services/logger.service';

import { databaseConfig } from './config/database.config';
import { DatabaseLoggerService } from './services/database-logger.service';
import { QueryRunnerService } from './services/query-runner.service';
import { BackupListener } from './listeners/backup.listener';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, LoggerService],
      useFactory: (config: ConfigService, logger: LoggerService) => ({
        ...databaseConfig(config),
        logger: new DatabaseLoggerService(logger),
      }),
    }),
  ],
  providers: [BackupListener, QueryRunnerService],
  exports: [QueryRunnerService],
})
export class DatabaseModule {}
