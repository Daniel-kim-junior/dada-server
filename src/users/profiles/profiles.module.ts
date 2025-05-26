import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Symbols } from 'symbols';
import { ProfilesRepositoryDrizzle } from './profiles.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: Symbols.ProfilesService,
      useClass: ProfilesService,
    },
    {
      provide: Symbols.ProfilesRepository,
      useClass: ProfilesRepositoryDrizzle, // Assuming ProfilesService implements the repository methods
    },
    {
      provide: Symbols.ProfilesLoader,
      useExisting: Symbols.ProfilesService, // Assuming ProfilesService has a loader method
    },
  ],
  controllers: [ProfilesController],
  exports: [Symbols.ProfilesLoader],
})
export class ProfilesModule {}
