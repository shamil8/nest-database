import { Repository } from 'typeorm';
import { LoggerService } from '../../logger/services/logger.service';

export abstract class BaseRepository {
  entity: Repository<any>;
  logger: LoggerService;
  protected constructor(entity: Repository<any>, logger: LoggerService) {
    this.entity = entity;
    this.logger = logger;
  }

  async updateById(id: string, data: object): Promise<boolean> {
    try {
      await this.entity.update({ id }, data);

      return true;
    } catch (err: any) {
      throw this.logger.error(err, {
        stack: this.updateById.name,
        extra: err,
      });
    }
  }
}
