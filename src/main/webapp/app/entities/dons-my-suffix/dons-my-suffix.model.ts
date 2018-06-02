import { BaseEntity } from './../../shared';

export class DonsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public uuid?: string,
        public don?: number,
        public customerId?: number,
    ) {
    }
}
