import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app.module';
import { UtilService } from './util/util.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');

    app.use(cookieParser());

    app.use(UtilService.sessionMiddleWare);

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(morgan('dev'));

    await app.listen(3000);
}
bootstrap();
