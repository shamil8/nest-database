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
