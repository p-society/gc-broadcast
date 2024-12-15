import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketIOMiddleware } from 'src/types/SocketIOMiddlware';
import { SocketClient } from 'src/types/SocketClient';
import { UsersService } from '../../users/users.service';
import { jwtConstants } from '../constants/jwt-constants';

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

        const user = await userService._get(payload.sub);
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
