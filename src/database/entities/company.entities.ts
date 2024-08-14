import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import { Location } from './locations.entities';
import { CompanyStatus } from '../../companies/utils/company-status.enum';

@Entity({ name: 'companies' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization: string;

    @Column({
        type: 'enum',
        enum: CompanyStatus,
        default: CompanyStatus.ACTIVED,
    })
    status: CompanyStatus;

    @Column({
        nullable: true
    })
    type?: string;

    @Column({
        nullable: true
    })
    serial?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description?: string;

    @Column({ type: 'int' })
    location_id: number;

    @OneToOne(() => Location, { eager: true })
    @JoinColumn({ name: 'location_id' })
    location: Location;


    @CreateDateColumn({ name: 'created_date' })
    created_at?: Date;

    @UpdateDateColumn({ name: 'modified_date' })
    updated_at?: Date;

    @DeleteDateColumn({ name: 'delete_date' })
    delete_at?: Date;

}