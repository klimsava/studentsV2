import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createCoursesTable1616350618025 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'courses',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'time',
                        type: 'string',
                    },
                ],
            }),
            true,
        );
        await queryRunner.createIndex(
            'courses',
            new TableIndex({
                columnNames: ['name'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses');
    }
}


