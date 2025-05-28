import { ApiProperty } from '@nestjs/swagger';
import { ClassDetail, MyClassCoursesAndSessionsResponse } from './classes.types';
import { Nullable } from 'src/common.types';
import { CourseProfileStatus } from '../courses/courses.types';
import { COURSE_PROFILE_STATUS } from '../courses/courses.constant';

export class MyClassCourseDto {
  @ApiProperty({
    description: '분반 ID',
    example: 1,
    required: true,
    type: Number,
  })
  public courseId: number;

  @ApiProperty({
    description: '분반 이름',
    example: 'Introduction to Programming',
    required: true,
    type: String,
  })
  public courseName: string;

  @ApiProperty({
    description: '분반 상태',
    example: 'PENDING',
    required: true,
    enum: COURSE_PROFILE_STATUS,
  })
  public status: CourseProfileStatus;

  @ApiProperty({
    description: '분반 설명',
    example: 'This course covers the basics of programming.',
    required: false,
    type: String,
  })
  public description?: string;

  public static of(obj: {
    courseId: number;
    courseName: string;
    description: Nullable<string>;
    status: CourseProfileStatus;
  }) {
    const dto = new MyClassCourseDto();
    dto.courseId = obj.courseId;
    dto.courseName = obj.courseName;
    dto.status = obj.status;
    dto.description = obj.description ?? null;
    return dto;
  }
}

export class MyClassCoursesAndSessionDto {
  @ApiProperty({
    description: '회차 ID',
    example: 1,
    required: true,
    type: Number,
  })
  public sessionId: number;

  @ApiProperty({
    description: '회차 번호',
    example: 1,
    required: true,
    type: Number,
  })
  public sessionNumber: number;

  @ApiProperty({
    description: '회차에 속한 강의 목록',
    type: [MyClassCourseDto],
    required: true,
  })
  public courses: MyClassCourseDto[];

  public static of(obj: {
    sessionId: number;
    sessionNumber: number;
    courses: {
      courseId: number;
      courseName: string;
      description: Nullable<string>;
      status: CourseProfileStatus;
    }[];
  }) {
    const dto = new MyClassCoursesAndSessionDto();
    dto.sessionId = obj.sessionId;
    dto.sessionNumber = obj.sessionNumber;
    dto.courses = obj.courses.map((course) => MyClassCourseDto.of(course));
    return dto;
  }
}

export class MyClassCoursesAndSessionsResponseDto {
  @ApiProperty({
    description: '강의 ID',
    example: 1,
    required: true,
    type: Number,
  })
  public classId: number;

  @ApiProperty({
    description: '강의 이름',
    example: 'Introduction to Programming',
    required: true,
    type: String,
  })
  public className: string;

  @ApiProperty({
    description: '강의 시작 날짜',
    example: '2023-01-01T00:00:00Z',
    required: true,
    type: Date,
  })
  public classOpenDate: Date;

  @ApiProperty({
    description: '강의 종료 날짜',
    example: '2023-12-31T23:59:59Z',
    required: true,
    type: Date,
  })
  public classCloseDate: Date;

  @ApiProperty({
    description: '강의 설명',
    example: 'This class covers the basics of programming.',
    required: false,
    type: String,
    nullable: true,
  })
  public description?: string;

  @ApiProperty({
    description: '강의에 속한 분반 회차 정보',
    type: [MyClassCoursesAndSessionDto],
    required: true,
  })
  public sessions: MyClassCoursesAndSessionDto[];

  public static of(obj: MyClassCoursesAndSessionsResponse) {
    const dto = new MyClassCoursesAndSessionsResponseDto();
    dto.classId = obj.classId;
    dto.className = obj.className;
    dto.classOpenDate = obj.classOpenDate;
    dto.classCloseDate = obj.classCloseDate;
    dto.description = obj.description;
    dto.sessions = obj.sessions.map((session) => MyClassCoursesAndSessionDto.of(session));
    return dto;
  }
}

export class ScheduleDto {
  @ApiProperty({
    description: '스케줄 ID',
    example: 1,
    required: true,
    type: Number,
  })
  public scheduleId: number;

  @ApiProperty({
    description: '스케줄 시간 데이터',
    example: '월요일 오전 10시 ~ 12시',
    required: true,
    type: String,
  })
  public timeData: string;

  @ApiProperty({
    description: '강사 프로필 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
    type: String,
  })
  public instructorProfileId: string;

  @ApiProperty({
    description: '강사 이름',
    example: '김민성',
    required: true,
    type: String,
  })
  public instructorName: string;

  @ApiProperty({
    description: '강의실 ID',
    example: 1,
    required: false,
    type: Number,
    nullable: true,
  })
  public classroomId?: Nullable<number>;

  @ApiProperty({
    description: '강의실 이름',
    example: '101호',
    required: false,
    type: String,
    nullable: true,
  })
  public classroomName?: Nullable<string>;

  public static of({
    scheduleId,
    timeData,
    instructorProfileId,
    instructorName,
    classroomId,
    classroomName,
  }: {
    scheduleId: number;
    timeData: string;
    instructorProfileId: string;
    instructorName: string;
    classroomId?: Nullable<number>;
    classroomName?: Nullable<string>;
  }) {
    const dto = new ScheduleDto();
    dto.scheduleId = scheduleId;
    dto.timeData = timeData;
    dto.instructorProfileId = instructorProfileId;
    dto.instructorName = instructorName;
    dto.classroomId = classroomId ?? null;
    dto.classroomName = classroomName ?? null;
    return dto;
  }
}

export class ClassDetailListDto {
  @ApiProperty({
    description: '강의 ID',
    example: 1,
    required: true,
    type: Number,
  })
  public classId: number;

  @ApiProperty({
    description: '강의 이름',
    example: 'Introduction to Programming',
    required: true,
    type: String,
  })
  public className: string;

  @ApiProperty({
    description: '강의 설명',
    example: 'This class covers the basics of programming.',
    required: false,
    type: String,
  })
  public description?: string;

  @ApiProperty({
    description: '강의 스케줄 정보',
    type: [ScheduleDto],
    required: true,
  })
  public schedules: ScheduleDto[];

  private constructor() {}

  public static of(obj: ClassDetail[]) {
    const dto = new ClassDetailListDto();
    dto.classId = obj[0].classes.id;
    dto.className = obj[0].classes.name;
    dto.description = obj[0].classes.description;
    dto.schedules = obj.map((schedule) =>
      ScheduleDto.of({
        scheduleId: schedule.lecture_schedules.scheduleId,
        timeData: schedule.lecture_schedules.timeData,
        instructorProfileId: schedule.lecture_schedules.instructorProfileId,
        instructorName: schedule.profiles.nickname,
        classroomId: schedule.lecture_schedules.classroomId ?? null,
        classroomName: schedule.classrooms.name ?? null,
      })
    );
    return dto;
  }
}
// classId: id,
//       className: name,
//       description,
//       classOpenDate: openDate,
//       classCloseDate: closeDate,
//       /**
//        * 강의 스케줄 정보
//        * 단순 데이터다 예) 김민성 수학 고급 강의
//        * 월요일 10:00 ~ 12:00
//        * 강사명: 김성민
//        * 강의실: 101호(없을수도 있음)
//        * 강의실 ID: 1(없을수도 있음)
//        * 각 스케줄의 강사정보
//        */
//       schedules: classDetail.map((detail) => ({
//         scheduleId: detail.lecture_schedules.scheduleId,
//         timeData: detail.lecture_schedules.timeData,
//         instructorProfileId: detail.lecture_schedules.instructorProfileId,
//         instructorName: detail.profiles.nickname,
//         classroomId: detail.lecture_schedules.classroomId,
//         classroomName: detail.classrooms.name,
//       })),
