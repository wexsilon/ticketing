import { Injectable } from '@nestjs/common';
import session from 'express-session';
import SQLiteStore from 'connect-sqlite3';

@Injectable()
export class UtilService {
    public static readonly SQLiteStoreInstance = SQLiteStore(session);
    public static readonly store = new UtilService.SQLiteStoreInstance({
        db: 'ticket.db',
    });
    public static readonly sessionMiddleWare = session({
        secret: 'aaaaaaaaaaaaaaaaaaa',
        resave: false,
        saveUninitialized: false,
        store: UtilService.store as any,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
    });
}
