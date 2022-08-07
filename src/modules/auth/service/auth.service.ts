import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../../customer/service/customer.service';
import { HostService } from '../../host/service/host.service';

type userParam = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

type jwtPayload = {
  userType: string;
  email: string;
  id: number;
  firstName: string;
  lastName: string;
};

type LoginOrRegister = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
  userType: string;
};

@Injectable()
export class AuthService {
  constructor(
    private hostService: HostService,
    private jwtService: JwtService,
    private customerService: CustomerService,
  ) {}
  async LoginOrRegister(
    user: userParam,
    userType: string,
  ): Promise<LoginOrRegister> {
    try {
      if (userType !== 'host' && userType !== 'customer') {
        throw new HttpException('wrong user type', 400);
      }
      const entityDervice =
        userType == 'host' ? this.hostService : this.customerService;
      let entityData = await entityDervice.findByEmail(user.user.email);
      if (!entityData) {
        entityData = await entityDervice.create({
          ...user.user,
        });
      }
      const token = this.generateJwt({
        id: entityData.id,
        email: entityData.email,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        userType: userType,
      });
      return {
        user: {
          id: entityData.id,
          ...user.user,
        },
        userType,
        token,
      };
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  generateJwt(data: jwtPayload) {
    return this.jwtService.sign(data, {
      secret: `${process.env.JWT_SECRET}`,
    });
  }
}
