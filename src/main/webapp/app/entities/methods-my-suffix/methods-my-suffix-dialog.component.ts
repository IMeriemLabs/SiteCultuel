import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MethodsMySuffix } from './methods-my-suffix.model';
import { MethodsMySuffixPopupService } from './methods-my-suffix-popup.service';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix-dialog',
    templateUrl: './methods-my-suffix-dialog.component.html'
})
export class MethodsMySuffixDialogComponent implements OnInit {

    methods: MethodsMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private methodsService: MethodsMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.methods.id !== undefined) {
            this.subscribeToSaveResponse(
                this.methodsService.update(this.methods));
        } else {
            this.subscribeToSaveResponse(
                this.methodsService.create(this.methods));
        }
    }

    private subscribeToSaveResponse(result: Observable<MethodsMySuffix>) {
        result.subscribe((res: MethodsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MethodsMySuffix) {
        this.eventManager.broadcast({ name: 'methodsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-methods-my-suffix-popup',
    template: ''
})
export class MethodsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private methodsPopupService: MethodsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.methodsPopupService
                    .open(MethodsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.methodsPopupService
                    .open(MethodsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
