import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { CreateClassValidator } from './classes.validator';
import { Symbols } from 'symbols';
import { ClassesService } from './classes.service';
import { ClassDetailResponse, MyClassCoursesAndSessionsResponse } from './classes.types';

/**
 * 강의
 */
@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  public constructor(
    @Inject(Symbols.ClassesService) private readonly _classesService: ClassesService
  ) {}

  @Get(':id/details')
  public async getClassDetails(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ClassDetailResponse> {
    return await this._classesService.getClassDetailSchedules({
      ...user,
      classId: id,
    });
  }
  /**
   * 강의에 속한 분반 회차 정보 조회
   */
  @Get('/students/:id/courses-and-sessions')
  public async getCoursesAndSessions(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<MyClassCoursesAndSessionsResponse> {
    return await this._classesService.getMyClassCoursesAndSessions({
      ...user,
      classId: id,
    });
  }

  @Post()
  public async addClassToOrganization(
    @ReqUser() user: RequestUser,
    @Body() param: CreateClassValidator
  ): Promise<void> {
    await this._classesService.addClassToOrganization({
      ...user,
      ...param,
    });
  }
}
