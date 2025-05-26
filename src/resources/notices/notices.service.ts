import { Inject, Injectable } from '@nestjs/common';
import { INoticeRepository } from './notices.repository';
import { Symbols } from 'symbols';
import { CreateNoticeParam } from './notices.types';
import { isNullish } from 'remeda';
import { UnAuthorizedError } from 'src/errors/errors';
import { IProfilesLoader } from 'src/users/profiles/profiles.types';
import { NoticesReferenceChecker } from './notices-reference-checker';

@Injectable()
export class NoticesService {
  public constructor(
    @Inject(Symbols.NoticeRepository) private readonly _noticesRepo: INoticeRepository,
    @Inject(Symbols.ProfilesLoader) private readonly _profileLoader: IProfilesLoader,
    @Inject(NoticesReferenceChecker)
    private readonly _noticesReferenceSelector: NoticesReferenceChecker
  ) {}

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
    const referenceObject = await this._noticesReferenceSelector.validateReferenceObject({
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
