import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Company } from './company.entities';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Company, company => company.location)
  company: Company;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  delete_at?: Date;
}