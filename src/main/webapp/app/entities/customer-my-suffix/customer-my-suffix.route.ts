import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CustomerMySuffixComponent } from './customer-my-suffix.component';
import { CustomerMySuffixDetailComponent } from './customer-my-suffix-detail.component';
import { CustomerMySuffixPopupComponent } from './customer-my-suffix-dialog.component';
import { CustomerMySuffixDeletePopupComponent } from './customer-my-suffix-delete-dialog.component';

export const customerRoute: Routes = [
    {
        path: 'customer-my-suffix',
        component: CustomerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-my-suffix/:id',
        component: CustomerMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-my-suffix-new',
        component: CustomerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-my-suffix/:id/edit',
        component: CustomerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-my-suffix/:id/delete',
        component: CustomerMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
