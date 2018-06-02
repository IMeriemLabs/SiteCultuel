import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PrayerMySuffix } from './prayer-my-suffix.model';
import { PrayerMySuffixService } from './prayer-my-suffix.service';

@Component({
    selector: 'jhi-prayer-my-suffix-detail',
    templateUrl: './prayer-my-suffix-detail.component.html'
})
export class PrayerMySuffixDetailComponent implements OnInit, OnDestroy {

    prayer: PrayerMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private prayerService: PrayerMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrayers();
    }

    load(id) {
        this.prayerService.find(id).subscribe((prayer) => {
            this.prayer = prayer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrayers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'prayerListModification',
            (response) => this.load(this.prayer.id)
        );
    }
}
