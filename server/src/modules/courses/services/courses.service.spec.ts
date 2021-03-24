import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { Courses } from '../../database/entities/courses.entity';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  let repository: Repository<Courses>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          CoursesService,
        {
          provide: getRepositoryToken(Courses),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<Repository<Courses>>(
        getRepositoryToken(Courses),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all courses', () => {
    it('it should return course', async () => {
      const сourses: Courses = {
        id: 1,
        name: 'test-course',
        description: 'Training in the programming language PHP',
        time: '11:00',
      };

      jest.spyOn(repository, 'find').mockResolvedValueOnce([сourses]);
      expect(await service.list()).toEqual([сourses]);
    });
  });

  describe('create new course', () => {
    it('it should create new course and return it', async () => {
      const courses: Courses = {
        id: 1,
        name: 'test-course',
        description: 'Training in the programming language PHP',
        time: '10:25',
      };

      const req: CreateCourseDto = {
        name: 'test-course',
        description: 'Training in the programming language PHP',
        time: '10:25'
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(courses);
      expect(await service.create(req)).toEqual(courses);
    });
  });
});
