import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TicketModule } from './ticket/ticket.module';
import { Ticket } from './ticket/entities/ticket.entity';
import { Message } from './ticket/entities/message.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UtilModule } from './util/util.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(
                __dirname,
                '..',
                'node_modules',
                'socket.io',
                'client-dist',
            ),
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'ticket.db',
            entities: [User, Ticket, Message],
            synchronize: true,
        }),
        UserModule,
        TicketModule,
        UtilModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
