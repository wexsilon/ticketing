import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { HttpAuthGuard } from './user/guards/auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(HttpAuthGuard)
    getHello(@Req() req, @Res() res: Response) {
        res.render('index', { user: req.user });
    }
}
