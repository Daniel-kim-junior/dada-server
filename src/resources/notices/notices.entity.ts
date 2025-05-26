import { NoticeAggregate, NoticeType } from './notices.types';

export class NoticeAggregateEntity {
  private _id: number;
  private _title: string;
  private _content: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _type: NoticeType;
  private _referenceId: number;

  private constructor() {}
  public static of(notice: NoticeAggregate) {
    const entity = new NoticeAggregateEntity();
    entity._id = notice.id;
    entity._title = notice.title;
    entity._type = notice.type as NoticeType;
    entity._referenceId = notice.referenceId;
    entity._content = notice.content;
    entity._createdAt = notice.createdAt;
    entity._updatedAt = notice.updatedAt;
    return entity;
  }

  public toResponse() {
    return {
      title: this._title,
      content: this._content,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get type(): NoticeType {
    return this._type;
  }

  public get referenceId(): number {
    return this._referenceId;
  }
}
