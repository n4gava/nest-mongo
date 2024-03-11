import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Public } from './unprotected.decorator';

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const unprotectedRoute = this.reflector.getAllAndOverride(Public, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (unprotectedRoute) return true;

        const request = context.switchToHttp().getRequest();
        const hasAuthenticatedUser = !!request.user;

        if (!hasAuthenticatedUser) throw new UnauthorizedException();

        return true;
    }
}
