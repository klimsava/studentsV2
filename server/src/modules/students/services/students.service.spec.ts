import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentsDto } from '../../dto/create-students.dto';
import { Students } from '../../database/entities/students.entity';
import { Courses } from '../../database/entities/courses.entity';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let service: StudentsService;

  let repository: Repository<Students>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Students),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get<Repository<Students>>(
        getRepositoryToken(Students),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all students', () => {
    it('it should return students', async () => {
      const students: Students = {
        id: 1,
        firstName: 'Adam',
        lastName: 'Smith',
        age: 20,
        courses: Courses[
            'php'
        ],
      };

      jest.spyOn(repository, 'find').mockResolvedValueOnce([students]);
      expect(await service.list()).toEqual([students]);
    });
  });

  describe('create new student', () => {
    it('it should create new student and return it', async () => {
      const student: Students = {
        id: 1,
        firstName: 'Adam',
        lastName: 'Smith',
        age: 20,
        courses: Courses[
            'php'
        ],
      };

      const req: CreateStudentsDto = {
        firstName: 'Adam',
        lastName: 'Smith',
        age: 20,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(student);
      expect(await service.create(req)).toEqual(student);
    });
  });
});

