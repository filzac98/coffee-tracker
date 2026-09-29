import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bean } from '../beans/bean.entity';

@Entity()
export class Brew {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Bean, (bean) => bean.brews, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  bean!: Bean;

  @Column()
  brewMethod!: string;

  @Column()
  machine!: string;

  @Column({ type: 'float' })
  coffeeDose!: number;

  @Column({ type: 'float' })
  yield!: number;

  @Column()
  brewTime!: number;

  @Column()
  grindSize!: string;

  @Column({ type: 'float', nullable: true })
  waterTemp!: number | null;

  @Column({ type: 'float' })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
