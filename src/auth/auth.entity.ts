import { IsIn } from 'class-validator';
import { Auth, AuthTypes } from './types';
import { AUTH_TYPES } from './constants';

export class AuthEntity {
  private _userId: string;
  private _identifier: string;
  private _password: string;
  private _type: AuthTypes;

  @IsIn(AUTH_TYPES)
  public type: AuthTypes;

  private constructor() {}

  public static of(auth: Auth) {
    const entity = new AuthEntity();
    entity._userId = auth.userId;
    entity._identifier = auth.identifier;
    entity._password = auth.password;
    entity._type = auth.type;
    return entity;
  }

  public get userId(): string {
    return this._userId;
  }

  public get identifier(): string {
    return this._identifier;
  }

  public get password(): string {
    return this._password;
  }
}
