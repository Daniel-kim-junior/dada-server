import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schemas';
import { Symbols } from 'symbols';

// 타입 정의
export type Database = MySql2Database<typeof schema>;
@Global()
@Module({
  providers: [
    {
      provide: Symbols.Database,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<Database> => {
        const dbConfig = configService.get('database');

        const pool = mysql.createPool({
          host: dbConfig.dbCredentials.host,
          port: dbConfig.dbCredentials.port,
          user: dbConfig.dbCredentials.user,
          password: dbConfig.dbCredentials.password,
          database: dbConfig.dbCredentials.database,
          ssl: dbConfig.dbCredentials.ssl,
          connectionLimit: 10,
          timezone: 'Z',
        });

        return drizzle(pool);
      },
    },
  ],
  exports: [Symbols.Database],
})
export class DatabaseModule {}
