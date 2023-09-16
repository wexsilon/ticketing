import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepositoy: Repository<User>,
    ) {}

    fetchOne(id: number) {
        return this.userRepositoy.findOneBy({ id });
    }

    async validateUser(username: string, password: string) {
        const user = await this.userRepositoy.findOneBy({ username });
        if (user && user.password === password) return user;
        return null;
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepositoy.create(createUserDto);
        user.messages = [];
        user.tickets = [];
        return this.userRepositoy.save(user);
    }
}
