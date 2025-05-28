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
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassDetailListDto, MyClassCoursesAndSessionsResponseDto } from './dto';

/**
 * 강의
 */
@ApiTags('Classes')
@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  public constructor(
    @Inject(Symbols.ClassesService) private readonly _classesService: ClassesService
  ) {}

  @ApiResponse({
    status: 200,
    description: '강의의 상세 정보를 조회합니다.',
    type: ClassDetailListDto,
  })
  @ApiParam({
    name: 'id',
    description: '수업 ID',
    type: Number,
  })
  @ApiBearerAuth()
  @Get(':id/details')
  public async getClassDetails(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ClassDetailListDto> {
    return await this._classesService.getClassDetailSchedules({
      ...user,
      classId: id,
    });
  }
  /**
   * 수업에 속한 분반 회차 정보 조회
   */
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '수업 ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '강의에 속한 분반 회차 정보 조회 (학생 전용)',
    type: MyClassCoursesAndSessionsResponseDto,
  })
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

  @ApiBody({
    type: CreateClassValidator,
    description: '강의를 생성합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '강의를 조직에 추가합니다.',
  })
  @Post()
  @ApiBearerAuth()
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
