export type ISessionsLoader = {
  getSessionById(id: number): Promise<Session>;
};

export type Session = {
  id: number;
  sessionNumber: number;
  classId: number;
};
