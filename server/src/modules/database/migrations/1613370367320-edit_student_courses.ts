import {MigrationInterface, QueryRunner} from "typeorm";

export class editStudentCourses1613370367320 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_courses CHANGE studentsId studentId INT(11) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
