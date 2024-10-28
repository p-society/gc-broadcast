import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneEmail(email);
    if (!user) throw new UnauthorizedException();
    const passwordValid = await bcrypt.compare(pass, user.password);
    // const passwordValid = pass === user.password;
    if (!passwordValid) {
      throw new UnauthorizedException();
    }
    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };
    return {
      user: sanitizedUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
