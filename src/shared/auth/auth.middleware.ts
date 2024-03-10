import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { FirebaseApp } from './firebase.app';
import type { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private auth: firebase.auth.Auth;

    constructor(private readonly firebaseApp: FirebaseApp) {
        this.auth = firebaseApp.getAuth();
    }

    use(req: Request, res: Response, next: () => void) {
        const token = req.headers.authorization;
        console.log("middleware")

        if (!token) {
            next();
            return;
        }

        this.auth
            .verifyIdToken(token.replace('Bearer ', ''))
            .then(async (decodedToken) => {
                req['user'] = {
                    user_id: decodedToken.user_id,
                    email: decodedToken.email,
                    email_verified: decodedToken.email_verified,
                    roles: decodedToken.roles || [],
                };

                req['tenantId'] = decodedToken.tenantId;
                next();
            })
            .catch(() => {
                next();
            });
    }
}
