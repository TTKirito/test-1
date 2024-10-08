import { Entity, Column, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from './locations.entities';
import { CompanyStatus } from '../../companies/utils/company-status.enum';
import { Device } from './device.entities';

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

    @Column({ type: 'int' })
    location_id: number;

    @OneToOne(() => Location, { eager: true })
    @JoinColumn({ name: 'location_id' })
    location: Location;


    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    @UpdateDateColumn({ name: 'modified_at' })
    updated_at?: Date;

    @DeleteDateColumn({ name: 'delete_at' })
    delete_at?: Date;

    @ManyToMany(() => Device)
    @JoinTable({
        name: 'company_devices',
        joinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'device_id',
            referencedColumnName: 'id',
        },
    })
    devices: Device[];

}