import {MigrationInterface, QueryRunner} from "typeorm";

export class editedTableWithTheStudents1613715403774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE students CHANGE last_name lastName VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
