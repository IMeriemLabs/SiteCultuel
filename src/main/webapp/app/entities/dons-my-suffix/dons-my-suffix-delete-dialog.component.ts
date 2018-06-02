import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DonsMySuffix } from './dons-my-suffix.model';
import { DonsMySuffixPopupService } from './dons-my-suffix-popup.service';
import { DonsMySuffixService } from './dons-my-suffix.service';

@Component({
    selector: 'jhi-dons-my-suffix-delete-dialog',
    templateUrl: './dons-my-suffix-delete-dialog.component.html'
})
export class DonsMySuffixDeleteDialogComponent {

    dons: DonsMySuffix;

    constructor(
        private donsService: DonsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.donsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'donsListModification',
                content: 'Deleted an dons'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dons-my-suffix-delete-popup',
    template: ''
})
export class DonsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private donsPopupService: DonsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.donsPopupService
                .open(DonsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
