import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Database } from 'src/databases/databases.module';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { ProfileConnections, Profiles } from 'src/databases/schemas';
import { eq, or } from 'drizzle-orm';
import { isEmpty } from 'remeda';
import { CreateProfileParam } from './profiles.types';
import { ProfileConnectionsEntity } from './profile-connection.entity';

export type IProfilesRepository = {
  getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>>;
  getProfilesByUserId(userId: string): Promise<ProfilesEntity[]>;
  createProfile(param: CreateProfileParam): Promise<void>;
  getConfirmedProfileConnection(profileId: string): Promise<ProfileConnectionsEntity>;
};

@Injectable()
export class ProfilesRepositoryDrizzle implements IProfilesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  /**
   * 프로필 연결 확인
   * @param profileId
   * @returns
   */
  public async getConfirmedProfileConnection(profileId: string): Promise<ProfileConnectionsEntity> {
    const founds = await this._db
      .select()
      .from(ProfileConnections)
      .where(
        or(
          eq(ProfileConnections.requesterProfileId, profileId),
          eq(ProfileConnections.targetProfileId, profileId)
        )
      );
    return ProfileConnectionsEntity.of(founds);
  }

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
