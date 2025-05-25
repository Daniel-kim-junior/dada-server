import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Symbols } from 'symbols';
import { AuthRepositoryDrizzle } from './auth.repository';
import { DatabaseModule } from 'src/databases/databases.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '24h' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: Symbols.AuthService,
      useClass: AuthService,
    },
    {
      provide: Symbols.AuthRepository,
      useClass: AuthRepositoryDrizzle,
    },
  ],
  exports: [],
})
export class AuthModule {}
