import {
    OnGatewayInit,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import SQLiteStore from 'connect-sqlite3';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookie from 'cookie-parse';
import { UtilService } from 'src/util/util.service';
import { WsAuthGuard } from './ws.auth.guard';
import { CreateMessageDto } from '../ticket/dto/create-message.dto';
import { TicketService } from 'src/ticket/ticket.service';
import { WsAdminOrUser } from 'src/ticket/guards/admin.or.user.guard';

@WebSocketGateway()
export class ChatGateway
    implements OnGatewayInit
{

    @WebSocketServer() server: Server;
    constructor(private readonly ticketService: TicketService) {}

    afterInit(server: Server) {
        const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
        server.use(wrap(UtilService.sessionMiddleWare));
    }


    @UseGuards(WsAuthGuard)
    @UseGuards(WsAdminOrUser)
    @SubscribeMessage('new-message')
    async handleMessage(client: any, createMessageDto: CreateMessageDto) {
        createMessageDto.authorId = client.request.session.passport.user.id;
        const message = await this.ticketService.putMessage(createMessageDto);
        client.broadcast.emit('get-message', message);
    }
}
