import {
  Body,
  Controller,
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
import {
  AddProfileToRosterValidator,
  CreateOrganizationValidator,
} from './organizations.validator';
import { Symbols } from 'symbols';
import { Organization } from './organizations.types';

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

  @Get('/my/rosters')
  public async getMyOrganizationRosters(@ReqUser() user: RequestUser) {
    /**
     * 해당 유저가 속한 조직 목록을 조회합니다
     */
    return {
      rosters: await this._organizationsService.getMyOrganizationRosters(user),
    };
  }

  @Get('/all')
  public async getAllOrganizations(@ReqUser() user: RequestUser): Promise<Organization[]> {
    return await this._organizationsService.getAllOrganizations(user);
  }

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
}
