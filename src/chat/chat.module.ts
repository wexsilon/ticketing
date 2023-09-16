import { Module } from '@nestjs/common';
import { TicketModule } from 'src/ticket/ticket.module';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [TicketModule],
})
export class ChatModule {}
