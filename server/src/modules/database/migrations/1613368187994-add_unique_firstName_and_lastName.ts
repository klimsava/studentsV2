import {MigrationInterface, QueryRunner} from "typeorm";

export class addUniqueFirstNameAndLastName1613368187994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE students ADD UNIQUE KEY first_name (first_name,last_name)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
