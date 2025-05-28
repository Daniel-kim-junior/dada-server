import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersService } from './users.service';
import { Symbols } from 'symbols';

@Module({
  imports: [ProfilesModule],
  controllers: [],
  providers: [
    {
      provide: Symbols.UsersService,
      useClass: UsersService,
    },
  ],
  exports: [Symbols.UsersService],
})
export class UsersModule {}
