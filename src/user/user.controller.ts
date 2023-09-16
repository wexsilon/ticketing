import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LocalGuard } from './guards/local.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('login')
    async handleLoginGet(@Res() res: Response) {
        res.render('user/login');
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async handleLoginPost(@Res() res: Response) {
        res.redirect('/ticket/list');
    }

    @Post('register')
    async handleRegisterPost(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
