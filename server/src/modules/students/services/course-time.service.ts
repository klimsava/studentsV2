import { Students } from '../entities/students.entity';
import { getConnection, getManager, Repository, EntityRepository } from 'typeorm';
import moment = require('moment');

@EntityRepository(Students)
export class CourseTimeService extends Repository<Students> {
    async selectCourse(studentId: number, courseId: number): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into('student_courses')
            .values([
                { studentId: studentId, courseId: courseId },
            ])
            .execute();
    }

    async allCourseTimeStudent(studentId: number): Promise<any[]> {
        const data = await getManager()
            .createQueryBuilder('students', 't1')
            .select('studentId, time', 'time')
            .innerJoin('student_courses', 't2', 't1.id = t2.studentId')
            .innerJoin('courses', 't3', 't2.courseId = t3.id')
            .where('t2.studentId = :id', { id: studentId })
            .getRawMany();

        return data.map(result => ({
            ...result,
        }));
    }

    async timeCourse(courseId: number): Promise<any> {
        const { time } = await getConnection()
            .createQueryBuilder()
            .select('time')
            .from('courses', 'courses')
            .where('id = :id', { id: courseId })
            .getRawOne();

        return time;
    }

    async checkExistCourse(allCourses: any, timeOfSelectedCourse: string): Promise<any> {
        const result = [];

        for (let i = 0; i < allCourses.length; i++) {
            result.push(allCourses[i].time);
        }

        for (const item of result) {
            const currentCourseTime = moment(item, 'hh:mm:ss').format('hh:mm');
            const subtractCurrentCourseTime = moment(item, 'hh:mm:ss').subtract(45, 'minutes').format('hh:mm');
            const intervalTime = moment(item, 'hh:mm:ss').add(45, 'minutes').format('hh:mm');
            const selectedCourseTime = moment(timeOfSelectedCourse, 'hh:mm:ss').format('hh:mm');

            return (selectedCourseTime === currentCourseTime) && ((selectedCourseTime >= intervalTime) || !(selectedCourseTime <= subtractCurrentCourseTime));
        }
    }
};
