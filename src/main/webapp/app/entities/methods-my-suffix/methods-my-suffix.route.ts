import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MethodsMySuffixComponent } from './methods-my-suffix.component';
import { MethodsMySuffixDetailComponent } from './methods-my-suffix-detail.component';
import { MethodsMySuffixPopupComponent } from './methods-my-suffix-dialog.component';
import { MethodsMySuffixDeletePopupComponent } from './methods-my-suffix-delete-dialog.component';

export const methodsRoute: Routes = [
    {
        path: 'methods-my-suffix',
        component: MethodsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'methods-my-suffix/:id',
        component: MethodsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const methodsPopupRoute: Routes = [
    {
        path: 'methods-my-suffix-new',
        component: MethodsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'methods-my-suffix/:id/edit',
        component: MethodsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'methods-my-suffix/:id/delete',
        component: MethodsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.methods.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
