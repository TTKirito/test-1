import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { CompanyStatus } from '../../companies/utils/company-status.enum';
import { Company } from './company.entities';

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn()
    public id: number;

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

    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    @UpdateDateColumn({ name: 'modified_at' })
    updated_at?: Date;

    @DeleteDateColumn({ name: 'delete_at' })
    delete_at?: Date;

    @ManyToMany(() => Company)
    @JoinTable({
        name: 'company_devices',
        joinColumn: {
            name: 'device_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
    })
    companies: Company[];

}