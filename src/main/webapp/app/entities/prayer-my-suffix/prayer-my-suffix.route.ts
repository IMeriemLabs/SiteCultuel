import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PrayerMySuffixComponent } from './prayer-my-suffix.component';
import { PrayerMySuffixDetailComponent } from './prayer-my-suffix-detail.component';
import { PrayerMySuffixPopupComponent } from './prayer-my-suffix-dialog.component';
import { PrayerMySuffixDeletePopupComponent } from './prayer-my-suffix-delete-dialog.component';

export const prayerRoute: Routes = [
    {
        path: 'prayer-my-suffix',
        component: PrayerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'prayer-my-suffix/:id',
        component: PrayerMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prayerPopupRoute: Routes = [
    {
        path: 'prayer-my-suffix-new',
        component: PrayerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prayer-my-suffix/:id/edit',
        component: PrayerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'prayer-my-suffix/:id/delete',
        component: PrayerMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'siteCultuelApp.prayer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
