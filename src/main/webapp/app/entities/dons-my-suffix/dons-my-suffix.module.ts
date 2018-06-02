import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteCultuelSharedModule } from '../../shared';
import {
    DonsMySuffixService,
    DonsMySuffixPopupService,
    DonsMySuffixComponent,
    DonsMySuffixDetailComponent,
    DonsMySuffixDialogComponent,
    DonsMySuffixPopupComponent,
    DonsMySuffixDeletePopupComponent,
    DonsMySuffixDeleteDialogComponent,
    donsRoute,
    donsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...donsRoute,
    ...donsPopupRoute,
];

@NgModule({
    imports: [
        SiteCultuelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DonsMySuffixComponent,
        DonsMySuffixDetailComponent,
        DonsMySuffixDialogComponent,
        DonsMySuffixDeleteDialogComponent,
        DonsMySuffixPopupComponent,
        DonsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DonsMySuffixComponent,
        DonsMySuffixDialogComponent,
        DonsMySuffixPopupComponent,
        DonsMySuffixDeleteDialogComponent,
        DonsMySuffixDeletePopupComponent,
    ],
    providers: [
        DonsMySuffixService,
        DonsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteCultuelDonsMySuffixModule {}
