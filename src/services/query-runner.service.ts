import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerService } from '@app/logger/services/logger.service';
import { ExceptionLocalCode } from 'src/enums/exception-local-code';
import { ExceptionMessage } from 'src/enums/exception-message';
import { AppHttpException } from 'src/filters/app-http.exception';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class QueryRunnerService {
  constructor(
    private readonly logger: LoggerService,
    private readonly dataSource: DataSource,
  ) {}

  async create(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
  }

  async finish(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();

    return queryRunner.release();
  }

  async rollback(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();

    return queryRunner.release();
  }

  async executeTransaction<T>(
    mainLogic: (queryRunner: QueryRunner) => Promise<T>,
    exMsg: ExceptionMessage,
    exLocalCode: ExceptionLocalCode,
    stack?: string,
  ): Promise<T> {
    const queryRunner = await this.create();

    try {
      const result = await mainLogic(queryRunner);

      await this.finish(queryRunner);

      return result;
    } catch (err: any) {
      await this.rollback(queryRunner);

      if (stack) {
        this.logger.error(exMsg, {
          stack,
          exLocalCode,
          extra: err?.message || err,
        });
      }

      throw new AppHttpException(
        exMsg,
        HttpStatus.NOT_ACCEPTABLE,
        exLocalCode,
        { err: err?.message || 'An unknown error occurred' },
      );
    }
  }
}
