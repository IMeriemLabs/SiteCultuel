import { BaseEntity } from './../../shared';

export class MethodsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public method?: string,
    ) {
    }
}
