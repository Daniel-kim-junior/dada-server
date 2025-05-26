import { Inject, Injectable } from '@nestjs/common';
import { ISessionsLoader, Session } from './sessions.types';
import { Symbols } from 'symbols';
import { ISessionsRepository } from './sessions.repository';
import { Class } from '../classes/classes.types';

@Injectable()
export class SessionsService implements ISessionsLoader {
  public constructor(
    @Inject(Symbols.SessionsRepository) private readonly _sessionRepository: ISessionsRepository
  ) {}

  public async getSessionAndClassById(id: number): Promise<{ sessions: Session; classes: Class }> {
    return await this._sessionRepository.getSessionAndClassById(id);
  }

  public async getSessionById(id: number): Promise<Session> {
    return await this._sessionRepository.getSessionById(id);
  }
}
