import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async create(createTicketDto: CreateTicketDto) {
        const t = this.ticketRepository.create(createTicketDto);
        t.messages = []
        return this.ticketRepository.save(t);
    }

    async putMessage(createMessageDto: CreateMessageDto) {
        const m = this.messageRepository.create(createMessageDto);
        return this.messageRepository.save(m);
    }

    async fetchMessage(ticketId: number) {
        return this.messageRepository.find({
            where: {
                ticketId
            }
        });
    }

    fetchAll() {
        return this.ticketRepository.find({});
    }

    fetchByUser(userId: number) {
        return this.ticketRepository.find({
            where: {
                creatorId: userId,
            },
        });
    }

    fetchOne(id: number) {
        return this.ticketRepository.findOne({
            where: {
                id,
            },
        });
    }
}
