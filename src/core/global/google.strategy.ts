import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GoogleTokenStrategy } from 'passport-google-verify-token/lib/strategy';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleTokenStrategy,
  'google',
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    });
  }

  async validate(
    accessToken: any,
    googleID: string,
    done: (err: any, user: any) => void,
  ): Promise<any> {
    const user = {
      user: {
        email: accessToken.email,
        firstName: accessToken.given_name,
        lastName: accessToken.family_name,
      },
      accessToken: googleID,
    };

    done(null, user);
  }
}
