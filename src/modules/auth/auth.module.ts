import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('mailer.host'),
          port: config.get<number>('mailer.port'),
          secure: false,
          auth: {
            user: config.get<string>('mailer.user'),
            pass: config.get<string>('mailer.pass'),
          },
        },
        defaults: {
          from: config.get<string>('mailer.from'),
        },
      }),
    }),

    JwtModule.register({}),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
