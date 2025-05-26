import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Symbols } from 'symbols';
import { SessionsRepositoryDrizzle } from './sessions.repository';

@Module({
  imports: [],
  controllers: [SessionsController],
  providers: [
    {
      provide: Symbols.SessionsService,
      useClass: SessionsService,
    },
    {
      provide: Symbols.SessionsLoader,
      useExisting: Symbols.SessionsService,
    },
    {
      provide: Symbols.SessionsRepository,
      useClass: SessionsRepositoryDrizzle,
    },
  ],

  exports: [Symbols.SessionsLoader],
})
export class SessionsModule {}
