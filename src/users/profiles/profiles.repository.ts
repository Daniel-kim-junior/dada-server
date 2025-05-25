import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Database } from 'src/databases/databases.module';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { Profiles } from 'src/databases/schemas';
import { eq } from 'drizzle-orm';
import { isEmpty } from 'remeda';
import { CreateProfileParam } from './profiles.types';

export type IProfilesRepository = {
  getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>>;
  getProfilesByUserId(userId: string): Promise<ProfilesEntity[]>;
  createProfile(param: CreateProfileParam): Promise<void>;
};

@Injectable()
export class ProfilesRepositoryDrizzle implements IProfilesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async getProfilesByUserId(userId: string): Promise<ProfilesEntity[]> {
    const founds = await this._db.select().from(Profiles).where(eq(Profiles.userId, userId));
    return founds.map((found) => ProfilesEntity.of(found));
  }
  public async createProfile(param: CreateProfileParam): Promise<void> {
    const { userId, role, nickname, introduction } = param;
    await this._db
      .insert(Profiles)
      .values({
        id: crypto.randomUUID(),
        userId,
        role,
        nickname,
        introduction,
      })
      .execute();
  }

  public async getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>> {
    const founds = await this._db
      .select()
      .from(Profiles)
      .where(eq(Profiles.id, profileId))
      .limit(1);
    return !isEmpty(founds) ? ProfilesEntity.of(founds[0]) : null;
  }
}
