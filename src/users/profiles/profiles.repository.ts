import { Nullable } from 'src/common.types';
import { ProfilesEntity } from './profiles.entity';
import { Database } from 'src/databases/databases.module';
import { Inject, Injectable } from '@nestjs/common';
import { Symbols } from 'symbols';
import { ProfileConnections, Profiles } from 'src/databases/schemas';
import { eq, or } from 'drizzle-orm';
import { isEmpty, isNullish } from 'remeda';
import {
  CreateProfileConnectionParam,
  CreateProfileParam,
  ProfileConnectionStatus,
} from './profiles.types';
import { ProfileConnectionsEntity } from './profile-connection.entity';

export type IProfilesRepository = {
  getProfileById(profileId: string): Promise<Nullable<ProfilesEntity>>;
  getProfiles(userId?: string): Promise<ProfilesEntity[]>;
  getConnectionProfileById(connectionId: number): Promise<ProfileConnectionsEntity>;
  createProfile(param: CreateProfileParam): Promise<void>;
  createProfileConnection(
    param: CreateProfileConnectionParam & {
      status: ProfileConnectionStatus;
    }
  ): Promise<void>;
  getProfileConnectionsByProfileId(profileId: string): Promise<ProfileConnectionsEntity>;
  updateProfileConnectionStatus(
    connectionId: number,
    status: ProfileConnectionStatus
  ): Promise<void>;
};

@Injectable()
export class ProfilesRepositoryDrizzle implements IProfilesRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async updateProfileConnectionStatus(
    connectionId: number,
    status: ProfileConnectionStatus
  ): Promise<void> {
    await this._db
      .update(ProfileConnections)
      .set({ status })
      .where(eq(ProfileConnections.id, connectionId))
      .execute();
  }

  public async getConnectionProfileById(connectionId: number): Promise<ProfileConnectionsEntity> {
    const founds = await this._db
      .select()
      .from(ProfileConnections)
      .where(eq(ProfileConnections.id, connectionId))
      .limit(1);
    return ProfileConnectionsEntity.of(founds);
  }

  public async createProfileConnection(
    param: CreateProfileConnectionParam & {
      status: ProfileConnectionStatus;
    }
  ): Promise<void> {
    const { profileId: requesterProfileId, targetProfileId, message, status } = param;
    await this._db
      .insert(ProfileConnections)
      .values({
        status,
        requesterProfileId,
        targetProfileId,
        message,
      })
      .execute();
  }

  /**
   * 자신이 요청하거나 받은 프로필 연결 리스트 조회
   * @param profileId
   * @returns
   */
  public async getProfileConnectionsByProfileId(
    profileId: string
  ): Promise<ProfileConnectionsEntity> {
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

  public async getProfiles(userId?: string): Promise<ProfilesEntity[]> {
    if (isNullish(userId)) {
      // 모든 프로필 조회
      const founds = await this._db.select().from(Profiles);
      return founds.map((found) => ProfilesEntity.of(found));
    }
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
