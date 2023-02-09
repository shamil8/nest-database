import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { getNANOID } from '@app/crypto-utils/functions/export-settings';

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
}
