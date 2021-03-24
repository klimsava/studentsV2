import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createStudentCoursesTable1616363372908 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'student_courses',
                columns: [
                    {
                        name: 'studentId',
                        type: 'int',
                    },
                    {
                        name: 'courseId',
                        type: 'int',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('student_courses');
    }
}
