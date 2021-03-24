import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from '../database/entities/students.entity';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { CourseTimeRepository } from './studentsRepository/courseTime.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController],
  providers: [StudentsService, CourseTimeRepository],
})

export class StudentsModule {}
