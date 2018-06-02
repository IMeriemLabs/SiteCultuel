import { BaseEntity } from './../../shared';

export class PrayerMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public sobh?: string,
        public chorouq?: string,
        public dohr?: string,
        public asr?: string,
        public maghreb?: string,
        public icha?: string,
        public locationId?: number,
        public methodId?: number,
        public degreeId?: number,
    ) {
    }
}
