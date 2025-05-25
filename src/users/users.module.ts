import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ProfilesModule, UsersService],
})
export class UsersModule {}
