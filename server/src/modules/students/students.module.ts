import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';
import { CourseTimeService } from './services/course-time.service';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController],
  providers: [StudentsService, CourseTimeService],
})

export class StudentsModule {}
