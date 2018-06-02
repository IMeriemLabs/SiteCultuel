import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrayerMySuffix } from './prayer-my-suffix.model';
import { PrayerMySuffixPopupService } from './prayer-my-suffix-popup.service';
import { PrayerMySuffixService } from './prayer-my-suffix.service';

@Component({
    selector: 'jhi-prayer-my-suffix-delete-dialog',
    templateUrl: './prayer-my-suffix-delete-dialog.component.html'
})
export class PrayerMySuffixDeleteDialogComponent {

    prayer: PrayerMySuffix;

    constructor(
        private prayerService: PrayerMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prayerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'prayerListModification',
                content: 'Deleted an prayer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prayer-my-suffix-delete-popup',
    template: ''
})
export class PrayerMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private prayerPopupService: PrayerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.prayerPopupService
                .open(PrayerMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
