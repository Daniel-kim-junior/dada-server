import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/auth/auth.types';
import { ReqUser } from 'src/decorator/request-user.decorator';
import { OrganiztionsService } from './organizations.service';
import { CreateClassValidator, CreateOrganizationValidator } from './organizations.validator';
import { Symbols } from 'symbols';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  public constructor(
    @Inject(Symbols.OrganizationsService)
    private readonly _organizationsService: OrganiztionsService
  ) {}

  @Post()
  public async createOrganization(
    @ReqUser() user: RequestUser,
    @Body() param: CreateOrganizationValidator
  ) {
    await this._organizationsService.createOrganization({ ...user, ...param });
  }

  @Put(':id')
  public async updateOrganization(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직 업데이트 로직을 여기에 추가합니다.
    return '조직이 성공적으로 업데이트되었습니다.';
  }

  @Get()
  public async getOrganizations(@ReqUser() user: RequestUser): Promise<string> {
    // 조직 목록 조회 로직을 여기에 추가합니다.
    return '조직 목록이 성공적으로 조회되었습니다.';
  }

  @Get(':id')
  public async getOrganizationById(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직 ID로 조회하는 로직을 여기에 추가합니다.
    return '조직이 성공적으로 조회되었습니다.';
  }

  @Get(':id/classes')
  public async getOrganizationClasses(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직에 속한 수업 목록 조회 로직을 여기에 추가합니다.
    return '조직의 수업 목록이 성공적으로 조회되었습니다.';
  }

  @Post(':id/classes')
  public async addClassToOrganization(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: CreateClassValidator
  ): Promise<void> {
    await this._organizationsService.addClassToOrganization({
      ...user,
      ...param,
      organizationId: id,
    });
  }

  @Get(':id/roster')
  public async getOrganizationRoster(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직에 속한 프로필 로스터 조회 로직을 여기에 추가합니다.
    return '조직의 프로필 로스터가 성공적으로 조회되었습니다.';
  }

  @Post(':id/roster')
  public async addProfileToOrganizationRoster(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직에 프로필을 추가하는 로직을 여기에 추가합니다.
    return '프로필이 조직의 로스터에 성공적으로 추가되었습니다.';
  }

  @Delete(':id/roster/:profileId')
  public async removeProfileFromOrganizationRoster(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('profileId', ParseIntPipe) profileId: number
  ): Promise<string> {
    // 조직에서 프로필을 제거하는 로직을 여기에 추가합니다.
    return '프로필이 조직의 로스터에서 성공적으로 제거되었습니다.';
  }

  @Delete(':id')
  public async deleteOrganization(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ): Promise<string> {
    // 조직 삭제 로직을 여기에 추가합니다.
    return '조직이 성공적으로 삭제되었습니다.';
  }
}
