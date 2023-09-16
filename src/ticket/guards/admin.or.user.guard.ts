import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { TicketService } from '../ticket.service';

@Injectable()
export class HttpAdminOrUser implements CanActivate {
    constructor(
        @Inject(TicketService) private readonly ticketService: TicketService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const ticket = await this.ticketService.fetchOne(
            parseInt(req.params.id),
        );
        return req.user.isAdmin || req.user.id == ticket.creatorId;
    }
}

@Injectable()
export class WsAdminOrUser implements CanActivate {
    constructor(
        @Inject(TicketService) private readonly ticketService: TicketService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const data = context.switchToWs().getData();
        const ticket = await this.ticketService.fetchOne(data.ticketId);

        return (
            client.request.session.passport.user.isAdmin ||
            client.request.session.passport.user.id == ticket.creatorId
        );
    }
}
