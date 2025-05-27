import { Inject, Injectable } from '@nestjs/common';
import { INoticeRepository } from './notices.repository';
import { Symbols } from 'symbols';
import { CreateNoticeParam, LongPollingNoticeQueryParam } from './notices.types';
import { isEmpty, isNullish } from 'remeda';
import { NotFoundError, UnAuthorizedError } from 'src/errors/errors';
import { IProfilesLoader } from 'src/users/profiles/profiles.types';
import { NoticesReferenceChecker } from './notices-reference-checker';
import { RequestUser } from 'src/auth/auth.types';

@Injectable()
export class NoticesService {
  public constructor(
    @Inject(Symbols.NoticeRepository) private readonly _noticesRepo: INoticeRepository,
    @Inject(Symbols.ProfilesLoader) private readonly _profileLoader: IProfilesLoader,
    @Inject(NoticesReferenceChecker)
    private readonly _noticesReferenceChecker: NoticesReferenceChecker
  ) {}

  public async getNotices(param: LongPollingNoticeQueryParam) {
    const {
      profileId: requestProfileId,
      lastNoticeId,
      referenceId,
      limit = 20,
      timeout = 20,
      type,
    } = param;
    if (isNullish(requestProfileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    const requestProfile = await this._profileLoader.getProfileById(requestProfileId);
    if (isNullish(requestProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }
    const isVisible = await this._noticesReferenceChecker.isVisibleNotice({
      type,
      id: referenceId,
      profile: requestProfile,
    });
    if (!isVisible) {
      throw new UnAuthorizedError('해당 공지사항을 조회할 권한이 없습니다.');
    }
    const maxTimeout = Math.min(timeout, 60) * 1000;
    const startTime = Date.now();
    const pollInterval = 2000;
    while (Date.now() - startTime < maxTimeout) {
      const notices = await this._noticesRepo.getNewNotices({
        lastNoticeId,
        referenceId,
        limit,
        type,
      });
      if (!isEmpty(notices)) {
        return {
          notices: notices.map((notice) => notice.toResponse()),
        };
      }
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    return {
      notices: [],
    };
  }

  public async getNoticeById(param: { id: number; user: RequestUser }) {
    const { user, id } = param;
    if (isNullish(user.profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    const requestProfile = await this._profileLoader.getProfileById(user.profileId);
    if (isNullish(requestProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }
    const foundNotice = await this._noticesRepo.getNoticeById(id);
    if (isNullish(foundNotice)) {
      throw new NotFoundError('존재하지 않는 공지사항입니다.');
    }
    /**
     * 공지사항의 참조 ID와 타입을 기반으로 해당 공지사항을 조회할 권한이 있는지 확인합니다.
     */
    const isVisible = await this._noticesReferenceChecker.isVisibleNotice({
      type: foundNotice.type,
      id: foundNotice.referenceId,
      profile: requestProfile,
    });

    if (!isVisible) {
      throw new UnAuthorizedError('해당 공지사항을 조회할 권한이 없습니다.');
    }

    return foundNotice.toResponse();
  }

  public async createNotice(param: CreateNoticeParam): Promise<void> {
    const { title, content, profileId, type, referenceId } = param;
    if (isNullish(profileId)) {
      throw new UnAuthorizedError('프로필이 선택되지 않았습니다. 프로필을 선택해주세요.');
    }
    const requestProfile = await this._profileLoader.getProfileById(profileId);
    if (isNullish(requestProfile)) {
      throw new UnAuthorizedError('존재하지 않는 프로필입니다.');
    }
    if (!requestProfile.isNoticeAuth()) {
      throw new UnAuthorizedError(
        `프로필 역할이 공지사항 작성 권한이 없습니다. 현재 프로필 역할: ${requestProfile.role}`
      );
    }
    /**
     * referenceId는 공지사항의 참조 ID (예: 분반 ID, 수업 ID, 회차 ID, 조직 ID)
     */
    const referenceObject = await this._noticesReferenceChecker.validateReferenceObject({
      type,
      id: referenceId,
    });
    if (isNullish(referenceObject)) {
      throw new UnAuthorizedError('유효하지 않은 참조 ID입니다.');
    }

    await this._noticesRepo.createNotice({
      title,
      content,
      referenceId,
      registerProfileId: profileId,
      type,
    });
  }
}
