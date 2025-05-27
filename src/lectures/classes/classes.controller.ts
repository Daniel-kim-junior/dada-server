import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { CreateClassValidator } from './classes.validator';
import { Symbols } from 'symbols';
import { ClassesService } from './classes.service';
import { ClassDetailResponse } from './classes.types';

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
  ): Promise<ClassDetailResponse> {
    return await this._classesService.getClassDetailSchedules({
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
