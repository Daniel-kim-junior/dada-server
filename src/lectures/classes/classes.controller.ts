import {
  Body,
  Controller,
  Delete,
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

@Controller('classes')
@UseGuards(JwtAuthGuard)
export class ClassesController {
  public constructor(
    @Inject(Symbols.ClassesService) private readonly _classesService: ClassesService
  ) {}

  @Get(':id')
  public async getClassById(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 클래스 ID로 조회하는 로직을 여기에 추가합니다.
    return '클래스가 성공적으로 조회되었습니다.';
  }

  @Get('sessions')
  public async getClassCourses(@ReqUser() user: RequestUser): Promise<string> {
    // 클래스에 속한 회차 목록 조회 로직을 여기에 추가합니다. 쿼리스트링 :id
    return '클래스의 회차 목록이 성공적으로 조회되었습니다.';
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

  @Delete(':id')
  public async deleteClass(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 클래스 삭제 로직을 여기에 추가합니다.
    return '클래스가 성공적으로 삭제되었습니다.';
  }
}
