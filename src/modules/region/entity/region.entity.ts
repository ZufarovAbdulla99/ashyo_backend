import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Address } from 'src/modules/address/entity';

@Entity({ name: 'region' })
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ['REGION', 'CITY', 'DISTRICT'],
    default: 'REGION',
  })
  type: 'REGION' | 'CITY' | 'DISTRICT';

  @ManyToOne(() => Region, (region) => region.children, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  parent: Region;

  @OneToMany(() => Region, (region) => region.parent)
  children: Region[];

  @OneToMany(() => Address, (address) => address.region)
  addresses: Address[];
}