import { BaseEntity } from './../../shared';

export class DegreesMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public degree?: string,
    ) {
    }
}
