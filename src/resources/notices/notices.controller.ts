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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetNoticesDto } from './dto';

@ApiTags('Notices')
@Controller('resources/notices')
@UseGuards(JwtAuthGuard)
export class NoticesController {
  public constructor(
    @Inject(Symbols.NoticesService) private readonly _noticesService: NoticesService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Long polling을 통해 공지사항을 조회합니다.',
    type: GetNoticesDto,
  })
  @ApiBearerAuth()
  @Get('/long-polling')
  public async getNotices(
    @ReqUser() user: RequestUser,
    @Query() query: LongPollingNoticeQueryValidator
  ) {
    return await this._noticesService.getNotices({ ...user, ...query });
  }

  @ApiResponse({
    status: 200,
    description: '공지사항을 생성합니다.',
  })
  @ApiBody({
    type: CreateNoticeValidator,
    description: '공지사항 생성',
  })
  @ApiBearerAuth()
  @Post()
  public async createNotice(@ReqUser() user: RequestUser, @Body() param: CreateNoticeValidator) {
    await this._noticesService.createNotice({
      ...user,
      ...param,
    });
  }
}
