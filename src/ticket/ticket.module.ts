import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Message } from './entities/message.entity';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, Message]), UserModule],
    controllers: [TicketController],
    providers: [TicketService, ChatGateway],
    exports: [TicketService],
})
export class TicketModule {}
