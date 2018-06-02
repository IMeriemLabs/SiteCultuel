import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DonsMySuffix } from './dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';

@Component({
    selector: 'jhi-dons-my-suffix-detail',
    templateUrl: './dons-my-suffix-detail.component.html'
})
export class DonsMySuffixDetailComponent implements OnInit, OnDestroy {

    dons: DonsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private donsService: DonsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDons();
    }

    load(id) {
        this.donsService.find(id).subscribe((dons) => {
            this.dons = dons;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'donsListModification',
            (response) => this.load(this.dons.id)
        );
    }
}
