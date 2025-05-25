import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Symbols } from 'symbols';
import { AuthRepositoryDrizzle } from './auth.repository';
import { DatabaseModule } from 'src/databases/databases.module';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ProfilesModule } from 'src/users/profiles/profiles.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRATION') || '24h';

        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not set');
        }

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    ProfilesModule,
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
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
