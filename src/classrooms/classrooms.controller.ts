import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';

@Controller('classrooms')
@UseGuards(JwtAuthGuard)
export class ClassroomsController {
  @Get(':classroomId')
  public async getClassroomById(
    @ReqUser() user: RequestUser,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return;
  }

  @Post(':classroomId/schedule')
  public async createClassroomSchedule(
    @ReqUser() user: RequestUser,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return '강의실 일정이 성공적으로 생성되었습니다.';
  }

  @Delete(':classroomId')
  public async deleteClassroom(
    @ReqUser() user: RequestUser,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return '강의실이 성공적으로 삭제되었습니다.';
  }

  @Delete(':classroomId/schedule/:scheduleId')
  public async deleteClassroomSchedule(
    @ReqUser() user: RequestUser,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return '강의실 일정이 성공적으로 삭제되었습니다.';
  }

  @Get(':classroomId/schedule')
  public async getClassroomSchedule(
    @ReqUser() user: RequestUser,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return '강의실 일정이 성공적으로 조회되었습니다.';
  }

  @Get(':classroomId/schedule/:scheduleId')
  public async getClassroomScheduleById(
    @ReqUser() user: RequestUser,
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Param('classroomId', ParseIntPipe) classroomId: number
  ) {
    return '강의실 일정 상세 정보가 성공적으로 조회되었습니다.';
  }
}
