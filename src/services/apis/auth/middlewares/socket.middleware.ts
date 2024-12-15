import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketIOMiddleware } from 'src/types/SocketIOMiddlware';
import { SocketClient } from 'src/types/SocketClient';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

export const SocketAuthMiddleware =
  (
    jwtService: JwtService,
    userService: UsersService,
    configService: ConfigService,
  ): SocketIOMiddleware =>
  async (client: SocketClient, next) => {
    try {
      const { token } = client.handshake.auth;

      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await jwtService.verifyAsync(token, {
          secret: configService.get<string>('JWT_SECRET'),
        });
        const user = await userService._get(payload.sub.id);
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