import { getNANOID } from '@app/crypto-utils/functions/export-settings';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string = getNANOID();

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updatedAt?: Date;

  @DeleteDateColumn({ default: null })
  deletedAt?: Date | null;
}
