import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Assuming user roles are available on the request object
    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Access restricted to administrators only.');
    }
    return true;
  }
}
