import { Direction } from '@app/crypto-utils/enums/repository/direction';
import { getNANOID } from '@app/crypto-utils/functions/export-settings';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index(['createdAt', 'id'])
export abstract class BaseEntity {
  @PrimaryColumn()
  id: string = getNANOID();

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt?: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updatedAt?: string;

  @DeleteDateColumn({ default: null })
  deletedAt?: Date | null;

  // Setting default order by createdAt DESC and id ASC
  static orderBy = {
    createdAt: Direction.DESC,
    id: Direction.ASC,
  };
}
