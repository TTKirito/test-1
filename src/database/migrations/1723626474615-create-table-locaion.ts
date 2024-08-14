import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableLocaion1723626474611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE locations (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                delete_at TIMESTAMP DEFAULT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE locations;
        `);
    }

}
