import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: `kamronbekbahriyev18@gmail.com`,
          pass: `whudllcxkbgnpgmu`,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.SENDING_EMAIL}>`,
      },
    }),

    JwtModule.register({}), // agar global JWT config bo'lsa bu bo'lim optional
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
