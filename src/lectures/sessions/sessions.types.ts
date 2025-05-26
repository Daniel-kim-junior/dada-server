import { Class } from '../classes/classes.types';

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
