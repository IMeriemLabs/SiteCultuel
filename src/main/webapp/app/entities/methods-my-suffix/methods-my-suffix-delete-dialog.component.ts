import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MethodsMySuffix } from './methods-my-suffix.model';
import { MethodsMySuffixPopupService } from './methods-my-suffix-popup.service';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix-delete-dialog',
    templateUrl: './methods-my-suffix-delete-dialog.component.html'
})
export class MethodsMySuffixDeleteDialogComponent {

    methods: MethodsMySuffix;

    constructor(
        private methodsService: MethodsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.methodsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'methodsListModification',
                content: 'Deleted an methods'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-methods-my-suffix-delete-popup',
    template: ''
})
export class MethodsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private methodsPopupService: MethodsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.methodsPopupService
                .open(MethodsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
