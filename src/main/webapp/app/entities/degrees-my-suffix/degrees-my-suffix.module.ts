import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteCultuelSharedModule } from '../../shared';
import {
    DegreesMySuffixService,
    DegreesMySuffixPopupService,
    DegreesMySuffixComponent,
    DegreesMySuffixDetailComponent,
    DegreesMySuffixDialogComponent,
    DegreesMySuffixPopupComponent,
    DegreesMySuffixDeletePopupComponent,
    DegreesMySuffixDeleteDialogComponent,
    degreesRoute,
    degreesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...degreesRoute,
    ...degreesPopupRoute,
];

@NgModule({
    imports: [
        SiteCultuelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DegreesMySuffixComponent,
        DegreesMySuffixDetailComponent,
        DegreesMySuffixDialogComponent,
        DegreesMySuffixDeleteDialogComponent,
        DegreesMySuffixPopupComponent,
        DegreesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DegreesMySuffixComponent,
        DegreesMySuffixDialogComponent,
        DegreesMySuffixPopupComponent,
        DegreesMySuffixDeleteDialogComponent,
        DegreesMySuffixDeletePopupComponent,
    ],
    providers: [
        DegreesMySuffixService,
        DegreesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteCultuelDegreesMySuffixModule {}
