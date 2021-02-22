import {MigrationInterface, QueryRunner} from "typeorm";

export class editedUniqueFirstNameAndLastName1613718936412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE students ADD UNIQUE KEY firstName (firstName,lastName)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
