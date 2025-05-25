import { Controller, Get, Inject } from '@nestjs/common';
import { Database } from './databases/databases.module';
import { sql } from 'drizzle-orm';
import { Symbols } from 'symbols';

@Controller('app')
export class AppController {
  public constructor(@Inject(Symbols.Database) private readonly _db: Database) {}
  @Get()
  public async healthCheck(): Promise<void> {
    try {
      const result = await this._db.execute(sql`SELECT 1 as test`);
      console.log('✅ MySQL 연결 성공:', result);

      // 추가 정보
      const dbInfo = await this._db.execute(
        sql`SELECT DATABASE() as current_db, VERSION() as version`
      );
      console.log('데이터베이스 정보:', dbInfo[0]);
    } catch (error) {
      console.error('❌ MySQL 연결 실패:', error.message);
    }
  }
}
