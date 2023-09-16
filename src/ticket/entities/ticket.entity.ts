import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    OneToMany,
    JoinColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => User, (user: User) => user.tickets)
    // creator: User;
    @Column()
    creatorId: number;

    @Column()
    title: string;

    // @OneToMany(() => Message, (message: Message) => message.ticket)
    // messages: Message[];
    @Column({ type: 'simple-json' })
    messages: number[];
}
