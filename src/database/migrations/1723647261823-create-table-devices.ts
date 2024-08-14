import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableDevices1723647261823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.query(`
                CREATE TYPE device_status AS ENUM ('actived', 'unactive');
            `),

            queryRunner.query(`
                CREATE TABLE devices (
                    id SERIAL PRIMARY KEY,
                    status device_status DEFAULT 'actived',
                    type VARCHAR(255),
                    serial VARCHAR(255),
                    description TEXT,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
                    modified_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    delete_at TIMESTAMP DEFAULT NULL
                );
            `)
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.query(`
            DROP TABLE devices;
        `),

            queryRunner.query(`
            DROP TYPE device_status;
        `)
        ])
    }

}
