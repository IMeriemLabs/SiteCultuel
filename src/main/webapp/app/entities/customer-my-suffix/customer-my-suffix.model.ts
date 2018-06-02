import { BaseEntity } from './../../shared';

export const enum Roles {
    'SYSADMIN',
    'ADMIN',
    'SUBSCRIBER',
    'EDITOR'
}

export class CustomerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public roles?: Roles,
        public email?: string,
        public phoneNumber?: string,
        public departmentId?: number,
        public dons?: BaseEntity[],
        public managerId?: number,
    ) {
    }
}
