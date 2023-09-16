import { User } from 'src/user/entities/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => User, (user: User) => user.messages)
    // author: User;
    @Column()
    authorId: number;

    // @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.messages)
    // ticket: Ticket;
    @Column()
    ticketId: number;

    @Column()
    content: string;
}
