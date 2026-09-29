import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Brew } from '../brews/brew.entity';

export enum RoastLevel {
  LIGHT = 'light',
  MEDIUM = 'medium',
  DARK = 'dark',
}

@Entity()
export class Bean {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Brew, (brew) => brew.bean)
  brews!: Brew[];

  @Column()
  roaster!: string;

  @Column()
  origin!: string;

  @Column()
  process!: string;

  @Column({
    type: 'enum',
    enum: RoastLevel,
  })
  roastLevel!: RoastLevel;

  @Column({ type: 'date' })
  roastDate!: string;

  @Column('text', { array: true })
  tastingNotes!: string[];

  @Column({ type: 'float' })
  rating!: number;
}
