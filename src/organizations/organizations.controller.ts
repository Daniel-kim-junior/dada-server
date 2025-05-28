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
import { OrganiztionsService } from './organizations.service';
import {
  AddProfileToOrganizationOwnershipValidator,
  AddProfileToRosterValidator,
  CreateOrganizationValidator,
} from './organizations.validator';
import { Symbols } from 'symbols';
import { Organization } from './organizations.types';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  OrganizationResponseDto,
  OrganizationRosterProfileResponseDto,
  OrganizationRosterResponseDto,
} from './dto';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  public constructor(
    @Inject(Symbols.OrganizationsService)
    private readonly _organizationsService: OrganiztionsService
  ) {}

  @ApiBody({
    type: CreateOrganizationValidator,
    description: '조직 생성',
  })
  @ApiResponse({
    status: 200,
    description: '조직을 생성합니다.',
  })
  @Post()
  @ApiBearerAuth()
  public async createOrganization(
    @ReqUser() user: RequestUser,
    @Body() param: CreateOrganizationValidator
  ) {
    await this._organizationsService.createOrganization({ ...user, ...param });
  }

  @ApiResponse({
    status: 200,
    description: '내 조직 로스터를 조회합니다.',
    type: OrganizationRosterResponseDto,
  })
  @ApiBearerAuth()
  @Get('/my/rosters')
  public async getMyOrganizationRosters(@ReqUser() user: RequestUser) {
    /**
     * 해당 유저가 속한 조직 목록을 조회합니다
     */
    return await this._organizationsService.getMyOrganizationRosters(user);
  }

  @ApiResponse({
    status: 200,
    description: '모든 조직을 조회합니다.',
    type: OrganizationResponseDto,
  })
  @ApiBearerAuth()
  @Get('/all')
  public async getAllOrganizations(@ReqUser() user: RequestUser): Promise<OrganizationResponseDto> {
    return await this._organizationsService.getAllOrganizations(user);
  }

  @ApiParam({ name: 'id', description: '조직 ID' })
  @ApiResponse({
    status: 200,
    description: '조직의 로스터를 조회합니다.',
    type: OrganizationRosterProfileResponseDto,
  })
  @ApiBearerAuth()
  @Get(':id/rosters')
  public async getOrganizationRoster(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this._organizationsService.getOrganizationRoster({
      ...user,
      organizationId: id,
    });
  }

  @ApiParam({ name: 'id', description: '조직 ID' })
  @ApiResponse({
    status: 200,
    description: '조직의 로스터에 프로필을 추가합니다.',
  })
  @ApiBody({
    type: AddProfileToRosterValidator,
    description: '조직의 로스터에 프로필을 추가하는 요청',
  })
  @ApiBearerAuth()
  @Post(':id/roster')
  public async addProfileToOrganizationRoster(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: AddProfileToRosterValidator
  ): Promise<void> {
    await this._organizationsService.addProfileToOrganizationRoster({
      ...user,
      ...param,
      organizationId: id,
    });
  }

  @ApiParam({ name: 'id', description: '조직 ID' })
  @ApiResponse({
    status: 200,
    description: '조직의 소유권에 프로필을 추가합니다.',
  })
  @ApiBody({
    type: AddProfileToOrganizationOwnershipValidator,
    description: '조직의 소유권에 프로필을 추가하는 요청',
  })
  @ApiBearerAuth()
  @Post(':id/ownership')
  public async addProfileToOrganizationOwnership(
    @ReqUser() user: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() param: AddProfileToOrganizationOwnershipValidator
  ): Promise<void> {
    await this._organizationsService.addProfileToOrganizationOwnership({
      ...user,
      ...param,
      organizationId: id,
    });
  }
}
