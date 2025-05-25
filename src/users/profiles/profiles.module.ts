import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { DatabaseModule } from 'src/databases/databases.module';
import { Symbols } from 'symbols';
import { ProfilesRepositoryDrizzle } from './profiles.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: Symbols.ProfilesService,
      useClass: ProfilesService,
    },
    {
      provide: Symbols.ProfilesRepository,
      useClass: ProfilesRepositoryDrizzle, // Assuming ProfilesService implements the repository methods
    },
  ],
  controllers: [ProfilesController],
  exports: [Symbols.ProfilesService],
})
export class ProfilesModule {}
