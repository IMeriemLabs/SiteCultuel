import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryMySuffix } from './country-my-suffix.model';
import { CountryMySuffixPopupService } from './country-my-suffix-popup.service';
import { CountryMySuffixService } from './country-my-suffix.service';

@Component({
    selector: 'jhi-country-my-suffix-delete-dialog',
    templateUrl: './country-my-suffix-delete-dialog.component.html'
})
export class CountryMySuffixDeleteDialogComponent {

    country: CountryMySuffix;

    constructor(
        private countryService: CountryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'countryListModification',
                content: 'Deleted an country'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-my-suffix-delete-popup',
    template: ''
})
export class CountryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.countryPopupService
                .open(CountryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
