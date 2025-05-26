import { NEED_CONFIRMATION } from './profiles.constant';
import { ProfileConnections } from './profiles.types';

export class ProfileConnectionsEntity {
  private _profileConnections: ProfileConnections[];

  public static of(profileConnections: ProfileConnections[]) {
    const entity = new ProfileConnectionsEntity();
    entity._profileConnections = profileConnections;
    return entity;
  }

  public isEmpty() {
    return this._profileConnections.length === 0;
  }

  public toConnectionResponse(profileId: string) {
    return {
      connections: this._profileConnections.map((connection) => ({
        id: connection.id,
        status: connection.status,
        createdAt: connection.createdAt,
        updatedAt: connection.updatedAt,
        requesterProfileId: connection.requesterProfileId,
        targetProfileId: connection.targetProfileId,
        isTargetProfile: connection.targetProfileId === profileId,
        isRequesterProfile: connection.requesterProfileId === profileId,
      })),
    };
  }
}
