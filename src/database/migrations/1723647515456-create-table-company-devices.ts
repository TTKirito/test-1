import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCompanyDevices1723647515456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.query(`
                CREATE TABLE company_devices( 
                    id SERIAL PRIMARY KEY,
                    company_id INT NOT NULL,
                    device_id INT NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
                    modified_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    delete_at TIMESTAMP DEFAULT NULL
                );
            `),

            queryRunner.query(`
                ALTER TABLE company_devices 
                ADD CONSTRAINT FK_company_id FOREIGN KEY (company_id) REFERENCES companies (id);
              `),

            queryRunner.query(`
                ALTER TABLE company_devices 
                ADD CONSTRAINT FK_device_id FOREIGN KEY (device_id) REFERENCES devices (id);
              `),
        ])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE company_devices;
        `);
    }

}
