import { RequestUser } from 'src/auth/auth.types';
import { Class } from '../classes/classes.types';
import { SessionApplyValidator } from './sessions.validator';

export type ISessionsLoader = {
  getSessionById(id: number): Promise<Session>;
  getSessionAndClassById(id: number): Promise<{
    sessions: Session;
    classes: Class;
  }>;
};

export type Session = {
  id: number;
  sessionNumber: number;
  classId: number;
};

export type SessionApplyParam = InstanceType<typeof SessionApplyValidator> & {
  sessionId: number;
} & RequestUser;
