export const Symbols = {
  /**
   * Common
   */
  ConfigReader: Symbol.for('ConfigReader'),
  Database: Symbol.for('Database'),

  /**
   * Services
   */
  UsersService: Symbol.for('UsersService'),
  OrganizationsService: Symbol.for('OrganizationsService'),
  AuthService: Symbol.for('AuthService'),
  ClassroomsService: Symbol.for('ClassroomsService'),
  LecturesService: Symbol.for('LecturesService'),
  ProfilesService: Symbol.for('ProfilesService'),
  NoticesService: Symbol.for('NoticesService'),
  ClassesService: Symbol.for('ClassesService'),
  SessionsService: Symbol.for('SessionsService'),
  CoursesService: Symbol.for('CoursesService'),
  NoticesCachePermissionService: Symbol.for('NoticesCachePermissionService'),

  /**
   * Repositories
   */
  OrganizationsRepository: Symbol.for('OrganizationsRepository'),
  ClassroomsRepository: Symbol.for('ClassroomsRepository'),
  ProfilesRepository: Symbol.for('ProfilesRepository'),
  ClassesRepository: Symbol.for('ClassesRepository'),
  NoticeRepository: Symbol.for('NoticeRepository'),
  AuthRepository: Symbol.for('AuthRepository'),
  SessionsRepository: Symbol.for('SessionsRepository'),
  CoursesRepository: Symbol.for('CoursesRepository'),

  /**
   * Loaders
   */
  ProfilesLoader: Symbol.for('ProfilesLoader'),
  OrganizationOwnershipLoader: Symbol.for('OrganizationOwnershipLoader'),
  OrganizationsLoader: Symbol.for('OrganizationsLoader'),
  ClassesLoader: Symbol.for('ClassesLoader'),
  SessionsLoader: Symbol.for('SessionsLoader'),
  CoursesLoader: Symbol.for('CoursesLoader'),
  CourseProfilesLoader: Symbol.for('CourseProfilesLoader'),
  CourseProfilesMutator: Symbol.for('CourseProfileMutator'),
  OrganizationRostersLoader: Symbol.for('OrganizationRostersLoader'),
  RedisProvider: Symbol.for('RedisProvider'),
};
