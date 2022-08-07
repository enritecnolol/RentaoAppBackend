import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('facebook/token')
  @UseGuards(AuthGuard('facebook'))
  facebookLoginOrRegister(@Req() req) {
    return this.authService.LoginOrRegister(req.user, req.query.user_type);
  }

  @Get('google/token')
  @UseGuards(AuthGuard('google'))
  googleLoginOrRegister(@Req() req) {
    return this.authService.LoginOrRegister(req.user, req.query.user_type);
  }
}
