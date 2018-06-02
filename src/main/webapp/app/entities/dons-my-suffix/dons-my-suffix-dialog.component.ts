import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DonsMySuffix } from './dons-my-suffix.model';
import { DonsMySuffixPopupService } from './dons-my-suffix-popup.service';
import { DonsMySuffixService } from './dons-my-suffix.service';
import { CustomerMySuffix, CustomerMySuffixService } from '../customer';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dons-my-suffix-dialog',
    templateUrl: './dons-my-suffix-dialog.component.html'
})
export class DonsMySuffixDialogComponent implements OnInit {

    dons: DonsMySuffix;
    isSaving: boolean;

    customers: CustomerMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private donsService: DonsMySuffixService,
        private customerService: CustomerMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: ResponseWrapper) => { this.customers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dons.id !== undefined) {
            this.subscribeToSaveResponse(
                this.donsService.update(this.dons));
        } else {
            this.subscribeToSaveResponse(
                this.donsService.create(this.dons));
        }
    }

    private subscribeToSaveResponse(result: Observable<DonsMySuffix>) {
        result.subscribe((res: DonsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DonsMySuffix) {
        this.eventManager.broadcast({ name: 'donsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: CustomerMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dons-my-suffix-popup',
    template: ''
})
export class DonsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private donsPopupService: DonsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.donsPopupService
                    .open(DonsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.donsPopupService
                    .open(DonsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
