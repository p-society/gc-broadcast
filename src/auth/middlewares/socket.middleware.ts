import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SocketIOMiddleware } from 'src/types/SocketIOMiddlware';
import { SocketClient } from 'src/types/SocketClient';

export const SocketAuthMiddleware =
  (jwtService: JwtService, userService: UsersService): SocketIOMiddleware =>
  async (client: SocketClient, next) => {
    try {
      const { token } = client.handshake.auth;

      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        const user = await userService.findOne(payload.sub);
        if (user) {
          client['user'] = user;
          return next();
        }
      } catch {
        throw new UnauthorizedException();
      }
    } catch (error) {
      return next(error);
    }
  };
