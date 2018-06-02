import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DegreesMySuffix } from './degrees-my-suffix.model';
import { DegreesMySuffixPopupService } from './degrees-my-suffix-popup.service';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix-dialog',
    templateUrl: './degrees-my-suffix-dialog.component.html'
})
export class DegreesMySuffixDialogComponent implements OnInit {

    degrees: DegreesMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private degreesService: DegreesMySuffixService,
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
        if (this.degrees.id !== undefined) {
            this.subscribeToSaveResponse(
                this.degreesService.update(this.degrees));
        } else {
            this.subscribeToSaveResponse(
                this.degreesService.create(this.degrees));
        }
    }

    private subscribeToSaveResponse(result: Observable<DegreesMySuffix>) {
        result.subscribe((res: DegreesMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DegreesMySuffix) {
        this.eventManager.broadcast({ name: 'degreesListModification', content: 'OK'});
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
    selector: 'jhi-degrees-my-suffix-popup',
    template: ''
})
export class DegreesMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private degreesPopupService: DegreesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.degreesPopupService
                    .open(DegreesMySuffixDialogComponent as Component, params['id']);
            } else {
                this.degreesPopupService
                    .open(DegreesMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
