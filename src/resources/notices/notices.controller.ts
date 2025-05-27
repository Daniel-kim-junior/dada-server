import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { Symbols } from 'symbols';
import { CreateNoticeValidator, LongPollingNoticeQueryValidator } from './notices.validator';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { RequestUser } from 'src/auth/auth.types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('resources/notices')
@UseGuards(JwtAuthGuard)
export class NoticesController {
  public constructor(
    @Inject(Symbols.NoticesService) private readonly _noticesService: NoticesService
  ) {}

  @Get('/long-polling')
  public async getNotices(
    @ReqUser() user: RequestUser,
    @Query() query: LongPollingNoticeQueryValidator
  ) {
    return await this._noticesService.getNotices({ ...user, ...query });
  }

  @Get(':id')
  public async getNoticeById(@ReqUser() user: RequestUser, @Param('id', ParseIntPipe) id: number) {
    await this._noticesService.getNoticeById({ user, id });
  }

  @Post()
  public async createNotice(@ReqUser() user: RequestUser, @Body() param: CreateNoticeValidator) {
    await this._noticesService.createNotice({
      ...user,
      ...param,
    });
  }
}
