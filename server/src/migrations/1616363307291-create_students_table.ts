import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createStudentsTable1616363307291 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'firstName',
                        type: 'varchar',
                    },
                    {
                        name: 'lastName',
                        type: 'varchar',
                    },
                    {
                        name: 'age',
                        type: 'int',
                    },
                ],
            }),
            true,
        );
        await queryRunner.createIndex(
            'students',
            new TableIndex({
                columnNames: ['firstName', 'lastName'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students');
    }
}
