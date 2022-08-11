import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from '../../core/global/facebook.strategy';
import { GoogleStrategy } from '../../core/global/google.strategy';
import { JwtStrategy } from '../../core/global/jwt.strategy';
import { customerModule } from '../customer/customer.module';
import { HostModule } from '../host/host.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '48h' },
    }),
    HostModule,
    customerModule,
  ],
  providers: [AuthService, FacebookStrategy, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
