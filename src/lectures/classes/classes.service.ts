import { Inject, Injectable } from '@nestjs/common';
import { Class, CreateClassParam, IClassesLoader } from './classes.types';
import { Symbols } from 'symbols';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';
import { IOrganizationOwnershipLoader } from 'src/organizations/organizations.types';
import { IClassesRepository } from './classes.repository';

@Injectable()
export class ClassesService implements IClassesLoader {
  public constructor(
    @Inject(Symbols.OrganizationOwnershipLoader)
    private readonly _organizationOwnershipLoader: IOrganizationOwnershipLoader,
    @Inject(Symbols.ClassesRepository)
    private readonly _classesRepo: IClassesRepository
  ) {}

  public async getClassById(id: number): Promise<Class> {
    return await this._classesRepo.getClassById(id);
  }

  public async addClassToOrganization(param: CreateClassParam) {
    const { profileId: requestProfileId, organizationId } = param;
    const ownership =
      await this._organizationOwnershipLoader.findOwnershipByProfileIdAndOrganizationId({
        profileId: requestProfileId,
        organizationId,
      });

    if (isNullish(ownership)) {
      throw new UnAuthorizedError(
        '조직 관리자/부관리자가 아닙니다. 조직 관리자/부관리자 프로필로 로그인해주세요.'
      );
    }

    await this._classesRepo.createClass(param);
  }
}
