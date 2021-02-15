import {MigrationInterface, QueryRunner} from "typeorm";

export class editTableStudentCourses1613370646182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_courses CHANGE coursesId courseId INT(11) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
