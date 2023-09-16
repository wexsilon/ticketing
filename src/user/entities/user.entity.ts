import { Message } from 'src/ticket/entities/message.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    // @OneToMany(() => Ticket, (ticket: Ticket) => ticket.creator)
    // tickets: Ticket[];
    @Column({ type: 'simple-json' })
    tickets: number[];

    // @OneToMany(() => Message, (message: Message) => message.author)
    // messages: Message[];
    @Column({ type: 'simple-json' })
    messages: number[];
}
