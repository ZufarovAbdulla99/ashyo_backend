import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register-dto';
import { LoginDto } from './dtos/login-dtos';
import { VerifyOtpDto } from './dtos/verify-dto';
import { ResetPasswordDto } from './dtos/reset-password';
import { Request, Request as ExpressRequest } from 'express';
import { Protected } from '@decorators';
import { Roles } from '@decorators';
import { UserRoles } from 'src/modules/user/enums/user-roles.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendOTPDto } from './dtos/send-otp.dto';
import { CheckAuthGuard, CheckRoleGuard, RequestInterface } from '@guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Ro‘yxatdan o‘tish' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login qilish' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Emailga OTP yuborish' })
  async sendOtp(@Body() dto: SendOTPDto) {
    return await this.authService.sendOtp(dto.email);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'OTP tasdiqlash' })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return await this.authService.verifyOtp(dto);
  }

  @Post('send-otp-reset')
  @ApiOperation({ summary: 'Parolni tiklash uchun OTP yuborish' })
  async sendOtpReset(@Body() dto: SendOTPDto) {
    return await this.authService.sendOtpForPasswordReset(dto.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Parolni tiklash' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto);
  }

  @Delete('logout')
  @ApiOperation({ summary: 'Logout qilish (foydalanuvchini tizimdan chiqarish)' })
  @UseGuards(CheckAuthGuard, CheckRoleGuard)
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  async logout(@Req() req: RequestInterface) {
    await this.authService.logout(req.userId);
    return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: 'Access va refresh tokenni yangilash' })
  async refresh(@Req() req: ExpressRequest) {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Refresh token yuborilmadi');
    }

    const refreshToken = authHeader.split('Bearer ')[1];
    return await this.authService.refreshTokens(refreshToken);
  }
}
