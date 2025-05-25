import { Inject, Injectable } from '@nestjs/common';
import { CreateClassParam } from './organizations.types';
import { IOrganizationsRepository } from './organizations.repository';
import { Symbols } from 'symbols';

@Injectable()
export class OrganiztionsService {
  public constructor(
    @Inject(Symbols.OrganizationsRepository) private readonly _repository: IOrganizationsRepository
  ) {}

  public async addClassToOrganization(param: CreateClassParam) {
    await this._repository.createClass(param);
  }
}
