import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Res,
    UseGuards,
    Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Response } from 'express';
import { HttpAdminOrUser } from './guards/admin.or.user.guard';
import { ChatGateway } from 'src/chat/chat.gateway';
import { HttpAuthGuard } from 'src/user/guards/auth.guard';

@UseGuards(HttpAuthGuard)
@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService,
        private readonly chatGatway: ChatGateway) {}

    @Get('create')
    handleCreateGet(@Res() res: Response) {
        res.render('ticket/create');
    }

    @Post('create')
    async handleCreatePost(
        @Body() createTicketDto: CreateTicketDto,
        @Req() req,
        @Res() res: Response,
    ) {
        createTicketDto.creatorId = req.user.id;
        const newTicket = await this.ticketService.create(
            createTicketDto,
            
        );
        this.chatGatway.server.emit('get-ticket', newTicket);
        res.redirect(`/ticket/${newTicket.id}`);
    }

    @Get('list')
    async handleListGet(@Req() req, @Res() res: Response) {
        let tickets;
        if (req.user.isAdmin) {
            tickets = await this.ticketService.fetchAll();
        } else {
            tickets = await this.ticketService.fetchByUser(req.user.id);
        }
        res.render('ticket/list', { tickets, user: req.user });
    }

    @Get(':id')
    @UseGuards(HttpAdminOrUser)
    async handleTicketGet(@Param('id') id: number, @Req() req, @Res() res: Response) {
        const ticket = await this.ticketService.fetchOne(id);
        const messages = await this.ticketService.fetchMessage(id);
        res.render('ticket/ticket', { messages, ticket, user: req.user });
    }
}
