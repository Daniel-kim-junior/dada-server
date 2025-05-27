import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/databases/databases.module';
import { NoticeOwnerships, Notices } from 'src/databases/schemas';
import { Symbols } from 'symbols';
import { NoticeType } from './notices.types';
import { Nullable } from 'src/common.types';
import { NoticeAggregateEntity } from './notices.entity';
import { and, desc, eq, gt } from 'drizzle-orm';
import { isEmpty } from 'remeda';

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
  getNoticeById(id: number): Promise<Nullable<NoticeAggregateEntity>>;
  getNewNotices({
    type,
    referenceId,
    lastNoticeId,
    limit,
  }: {
    type: NoticeType;
    referenceId: number;
    limit: number;
    lastNoticeId?: number;
  }): Promise<NoticeAggregateEntity[]>;
};

@Injectable()
export class NoticesRepositoryDrizzle implements INoticeRepository {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  public async getNewNotices({
    type,
    referenceId,
    lastNoticeId,
    limit,
  }: {
    type: NoticeType;
    referenceId: number;
    limit: number;
    lastNoticeId?: number;
  }): Promise<NoticeAggregateEntity[]> {
    // 기본 조건들
    const conditions = [
      eq(NoticeOwnerships.type, type),
      eq(NoticeOwnerships.referenceId, referenceId),
    ];

    // lastNoticeId가 있을 때만 추가
    if (lastNoticeId) {
      conditions.push(gt(Notices.id, lastNoticeId));
    }
    const notices = await this._db
      .select({
        id: Notices.id,
        title: Notices.title,
        content: Notices.content,
        createdAt: Notices.createdAt,
        updatedAt: Notices.updatedAt,
        type: NoticeOwnerships.type,
        referenceId: NoticeOwnerships.referenceId,
      })
      .from(Notices)
      .innerJoin(NoticeOwnerships, eq(Notices.id, NoticeOwnerships.noticeId))
      .where(and(...conditions))
      .orderBy(desc(Notices.id))
      .limit(limit);
    return isEmpty(notices) ? [] : notices.map((notice) => NoticeAggregateEntity.of(notice));
  }

  public async getNoticeById(id: number): Promise<Nullable<NoticeAggregateEntity>> {
    const res = await this._db
      .select({
        id: Notices.id,
        title: Notices.title,
        content: Notices.content,
        createdAt: Notices.createdAt,
        updatedAt: Notices.updatedAt,
        type: NoticeOwnerships.type,
        referenceId: NoticeOwnerships.referenceId,
      })
      .from(Notices)
      .innerJoin(NoticeOwnerships, eq(Notices.id, NoticeOwnerships.noticeId))
      .where(eq(Notices.id, id))
      .limit(1);

    return isEmpty(res) ? null : NoticeAggregateEntity.of(res[0]);
  }

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
