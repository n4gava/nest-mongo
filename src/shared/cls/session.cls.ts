import { Injectable } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';

export interface ISessionStore {
    tenantId?: string;
    user?: {
        user_id?: string;
        email?: string;
        email_verified: boolean;
        roles: string[];
    };
}

export interface SessionClsStore extends ClsStore, ISessionStore {}

@Injectable()
export class SessionContext {
    constructor(private readonly cls: ClsService<SessionClsStore>) {}

    public get(): ISessionStore {
        const { tenantId, user } = this.cls.get();
        return {
            tenantId: tenantId,
            user: user,
        };
    }
}

export function setSessionClsByRequest(
    cls: ClsService<ClsStore>,
    req: any,
    res: any,
) {
    const store: ISessionStore = {
        tenantId: req['tenantId'],
        user: {
            email_verified: req['user']?.email_verified,
            roles: req['user']?.roles ?? [],
            email: req['user']?.email,
            user_id: req['user']?.user_id,
        },
    };

    cls.set('tenantId', store.tenantId);
    cls.set('user', store.user);
}
