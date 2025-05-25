import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/types';
import { ReqUser } from 'src/decorator/request-user.decorator';

@Controller('classrooms')
export class ClassroomsController {
  @Get(':classroomId')
  @UseGuards(JwtAuthGuard)
  public async getClassroomById(
    @ReqUser() user: RequestUser,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return;
  }

  @Post()
  public async createClassroom() {
    return '강의실이 성공적으로 생성되었습니다.';
  }

  @Post(':classroomId/schedule')
  public async createClassroomSchedule() {
    return '강의실 일정이 성공적으로 생성되었습니다.';
  }

  @Delete(':classroomId')
  public async deleteClassroom() {
    return '강의실이 성공적으로 삭제되었습니다.';
  }

  @Delete(':classroomId/schedule/:scheduleId')
  public async deleteClassroomSchedule() {
    return '강의실 일정이 성공적으로 삭제되었습니다.';
  }

  @Get(':classroomId/schedule')
  public async getClassroomSchedule() {
    return '강의실 일정이 성공적으로 조회되었습니다.';
  }

  @Get(':classroomId/schedule/:scheduleId')
  public async getClassroomScheduleById() {
    return '강의실 일정 상세 정보가 성공적으로 조회되었습니다.';
  }
}
