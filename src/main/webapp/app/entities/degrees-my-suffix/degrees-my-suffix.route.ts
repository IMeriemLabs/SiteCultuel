import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DegreesMySuffixComponent } from './degrees-my-suffix.component';
import { DegreesMySuffixDetailComponent } from './degrees-my-suffix-detail.component';
import { DegreesMySuffixPopupComponent } from './degrees-my-suffix-dialog.component';
import { DegreesMySuffixDeletePopupComponent } from './degrees-my-suffix-delete-dialog.component';

export const degreesRoute: Routes = [
    {
        path: 'degrees-my-suffix',
        component: DegreesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'degrees-my-suffix/:id',
        component: DegreesMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const degreesPopupRoute: Routes = [
    {
        path: 'degrees-my-suffix-new',
        component: DegreesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'degrees-my-suffix/:id/edit',
        component: DegreesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'degrees-my-suffix/:id/delete',
        component: DegreesMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.degrees.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
