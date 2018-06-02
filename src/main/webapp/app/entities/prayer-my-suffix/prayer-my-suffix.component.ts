import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { PrayerMySuffix } from './prayer-my-suffix.model';
import { PrayerMySuffixService } from './prayer-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-prayer-my-suffix',
    templateUrl: './prayer-my-suffix.component.html'
})
export class PrayerMySuffixComponent implements OnInit, OnDestroy {
prayers: PrayerMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prayerService: PrayerMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.prayerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.prayers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPrayers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PrayerMySuffix) {
        return item.id;
    }
    registerChangeInPrayers() {
        this.eventSubscriber = this.eventManager.subscribe('prayerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
