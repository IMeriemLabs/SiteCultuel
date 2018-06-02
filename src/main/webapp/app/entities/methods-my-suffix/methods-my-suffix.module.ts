import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteCultuelSharedModule } from '../../shared';
import {
    MethodsMySuffixService,
    MethodsMySuffixPopupService,
    MethodsMySuffixComponent,
    MethodsMySuffixDetailComponent,
    MethodsMySuffixDialogComponent,
    MethodsMySuffixPopupComponent,
    MethodsMySuffixDeletePopupComponent,
    MethodsMySuffixDeleteDialogComponent,
    methodsRoute,
    methodsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...methodsRoute,
    ...methodsPopupRoute,
];

@NgModule({
    imports: [
        SiteCultuelSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MethodsMySuffixComponent,
        MethodsMySuffixDetailComponent,
        MethodsMySuffixDialogComponent,
        MethodsMySuffixDeleteDialogComponent,
        MethodsMySuffixPopupComponent,
        MethodsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MethodsMySuffixComponent,
        MethodsMySuffixDialogComponent,
        MethodsMySuffixPopupComponent,
        MethodsMySuffixDeleteDialogComponent,
        MethodsMySuffixDeletePopupComponent,
    ],
    providers: [
        MethodsMySuffixService,
        MethodsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SiteCultuelMethodsMySuffixModule {}
