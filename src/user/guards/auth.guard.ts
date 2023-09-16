import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if (!req.isAuthenticated()) {
            const res = context.switchToHttp().getResponse();
            res.redirect('/user/login');
        }
        return req.isAuthenticated();
    }
}

@Injectable()
export class WsAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (context.switchToWs().getClient().request.session.passport)
            return true;
        return false;
    }
}
