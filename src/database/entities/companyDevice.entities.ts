import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entities';
import { Device } from './device.entities';


@Entity({ name: 'company_devices' })
export class CompanyDevice {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'int' })
    company_id: number;

    @Column({ type: 'int' })
    device_id: number;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @ManyToOne(() => Device)
    @JoinColumn({ name: 'device_id' })
    device: Device;

    @CreateDateColumn({ name: 'created_at' })
    created_at?: Date;

    @UpdateDateColumn({ name: 'modified_at' })
    modified_at?: Date;

    @DeleteDateColumn({ name: 'delete_at' })
    delete_date?: Date;

}
