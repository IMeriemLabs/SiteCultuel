import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DonsMySuffixComponent } from './dons-my-suffix.component';
import { DonsMySuffixDetailComponent } from './dons-my-suffix-detail.component';
import { DonsMySuffixPopupComponent } from './dons-my-suffix-dialog.component';
import { DonsMySuffixDeletePopupComponent } from './dons-my-suffix-delete-dialog.component';

export const donsRoute: Routes = [
    {
        path: 'dons-my-suffix',
        component: DonsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dons-my-suffix/:id',
        component: DonsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const donsPopupRoute: Routes = [
    {
        path: 'dons-my-suffix-new',
        component: DonsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dons-my-suffix/:id/edit',
        component: DonsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dons-my-suffix/:id/delete',
        component: DonsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.dons.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
