import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { DonsMySuffix } from './dons-my-suffix.model';
import { DonsMySuffixService } from './dons-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dons-my-suffix',
    templateUrl: './dons-my-suffix.component.html'
})
export class DonsMySuffixComponent implements OnInit, OnDestroy {
dons: DonsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private donsService: DonsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.donsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dons = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DonsMySuffix) {
        return item.id;
    }
    registerChangeInDons() {
        this.eventSubscriber = this.eventManager.subscribe('donsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
