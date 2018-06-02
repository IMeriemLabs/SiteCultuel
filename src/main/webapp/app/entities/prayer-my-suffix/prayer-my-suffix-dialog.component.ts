import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrayerMySuffix } from './prayer-my-suffix.model';
import { PrayerMySuffixPopupService } from './prayer-my-suffix-popup.service';
import { PrayerMySuffixService } from './prayer-my-suffix.service';
import { LocationMySuffix, LocationMySuffixService } from '../location';
import { MethodsMySuffix, MethodsMySuffixService } from '../methods';
import { DegreesMySuffix, DegreesMySuffixService } from '../degrees';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prayer-my-suffix-dialog',
    templateUrl: './prayer-my-suffix-dialog.component.html'
})
export class PrayerMySuffixDialogComponent implements OnInit {

    prayer: PrayerMySuffix;
    isSaving: boolean;

    locations: LocationMySuffix[];

    methods: MethodsMySuffix[];

    degrees: DegreesMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private prayerService: PrayerMySuffixService,
        private locationService: LocationMySuffixService,
        private methodsService: MethodsMySuffixService,
        private degreesService: DegreesMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService
            .query({filter: 'prayer-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.prayer.locationId) {
                    this.locations = res.json;
                } else {
                    this.locationService
                        .find(this.prayer.locationId)
                        .subscribe((subRes: LocationMySuffix) => {
                            this.locations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.methodsService
            .query({filter: 'prayer-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.prayer.methodId) {
                    this.methods = res.json;
                } else {
                    this.methodsService
                        .find(this.prayer.methodId)
                        .subscribe((subRes: MethodsMySuffix) => {
                            this.methods = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.degreesService
            .query({filter: 'prayer-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.prayer.degreeId) {
                    this.degrees = res.json;
                } else {
                    this.degreesService
                        .find(this.prayer.degreeId)
                        .subscribe((subRes: DegreesMySuffix) => {
                            this.degrees = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.prayer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.prayerService.update(this.prayer));
        } else {
            this.subscribeToSaveResponse(
                this.prayerService.create(this.prayer));
        }
    }

    private subscribeToSaveResponse(result: Observable<PrayerMySuffix>) {
        result.subscribe((res: PrayerMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PrayerMySuffix) {
        this.eventManager.broadcast({ name: 'prayerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: LocationMySuffix) {
        return item.id;
    }

    trackMethodsById(index: number, item: MethodsMySuffix) {
        return item.id;
    }

    trackDegreesById(index: number, item: DegreesMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-prayer-my-suffix-popup',
    template: ''
})
export class PrayerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prayerPopupService: PrayerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.prayerPopupService
                    .open(PrayerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.prayerPopupService
                    .open(PrayerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
