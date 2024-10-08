import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCompany1723626484530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.query(`
                CREATE TYPE company_status AS ENUM ('actived', 'unactive');
            `),

            queryRunner.query(`
                CREATE TABLE companies (
                    id SERIAL PRIMARY KEY,
                    organization VARCHAR(255) NOT NULL,
                    status company_status DEFAULT 'actived',
                    location_id INT NOT NULL,
                    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL,
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
            DROP TABLE companies;
        `),

            queryRunner.query(`
            DROP TYPE company_status;
        `)
        ])
    }

}
