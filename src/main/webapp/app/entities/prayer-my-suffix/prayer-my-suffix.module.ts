import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteCultuelSharedModule } from '../../shared';
import {
    PrayerMySuffixService,
    PrayerMySuffixPopupService,
    PrayerMySuffixComponent,
    PrayerMySuffixDetailComponent,
    PrayerMySuffixDialogComponent,
    PrayerMySuffixPopupComponent,
    PrayerMySuffixDeletePopupComponent,
    PrayerMySuffixDeleteDialogComponent,
    prayerRoute,
    prayerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...prayerRoute,
    ...prayerPopupRoute,
];

@NgModule({
    imports: [
        SiteCultuelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrayerMySuffixComponent,
        PrayerMySuffixDetailComponent,
        PrayerMySuffixDialogComponent,
        PrayerMySuffixDeleteDialogComponent,
        PrayerMySuffixPopupComponent,
        PrayerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PrayerMySuffixComponent,
        PrayerMySuffixDialogComponent,
        PrayerMySuffixPopupComponent,
        PrayerMySuffixDeleteDialogComponent,
        PrayerMySuffixDeletePopupComponent,
    ],
    providers: [
        PrayerMySuffixService,
        PrayerMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteCultuelPrayerMySuffixModule {}
