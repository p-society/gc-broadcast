import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Users } from '../users/schemas/users.schema';
import getClassProperties from 'src/common/get-class-properties';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const [user] = (await this.usersService._find({
      $paginate: false,
      email,
      $limit: 1,
      $select: [
        'firstName',
        'middleName',
        'lastName',
        'phone',
        'email',
        'gender',
        'batch',
        'branch',
        'createdBy',
        'deleted',
        'deletedBy',
        'deletedAt',
        '_id',
        'password',
      ],
    })) as Users[];

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
