import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/databases/databases.module';
import { NoticeOwnerships, Notices } from 'src/databases/schemas';
import { Symbols } from 'symbols';
import { NoticeType } from './notices.types';

export type INoticeRepository = {
  createNotice({
    referenceId,
    title,
    content,
    registerProfileId,
    type,
  }: {
    referenceId: number;
    title: string;
    content: string;
    registerProfileId: string;
    type: NoticeType;
  }): Promise<void>;
};

@Injectable()
export class NoticesRepositoryDrizzle implements INoticeRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}

  public async createNotice({
    referenceId,
    title,
    content,
    registerProfileId,
    type,
  }: {
    referenceId: number;
    title: string;
    content: string;
    registerProfileId: string;
    type: NoticeType;
  }): Promise<void> {
    await this._db.transaction(async (tx) => {
      const [notice] = await tx
        .insert(Notices)
        .values({
          title,
          content,
        })
        .$returningId();
      await tx.insert(NoticeOwnerships).values({
        noticeId: notice.id,
        referenceId,
        registerProfileId,
        type,
      });
    });
  }
}
