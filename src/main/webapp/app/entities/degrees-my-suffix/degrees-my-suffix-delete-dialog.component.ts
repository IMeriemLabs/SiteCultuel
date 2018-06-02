import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DegreesMySuffix } from './degrees-my-suffix.model';
import { DegreesMySuffixPopupService } from './degrees-my-suffix-popup.service';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix-delete-dialog',
    templateUrl: './degrees-my-suffix-delete-dialog.component.html'
})
export class DegreesMySuffixDeleteDialogComponent {

    degrees: DegreesMySuffix;

    constructor(
        private degreesService: DegreesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.degreesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'degreesListModification',
                content: 'Deleted an degrees'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-degrees-my-suffix-delete-popup',
    template: ''
})
export class DegreesMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private degreesPopupService: DegreesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.degreesPopupService
                .open(DegreesMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
