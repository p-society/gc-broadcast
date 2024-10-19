import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Socket } from 'socket.io';
import { jwtConstants } from '../constants';

/**
 * @deprecated Use `SocketAuthMiddleware` instead for WebSocket authentication.
 */
@Injectable()
export class SocketGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    const client: Socket = ctx.switchToWs().getClient();
    const { token } = client.handshake.auth;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user = await this.userService.findOne(payload.sub);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      if (user) {
        client['user'] = user;
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
