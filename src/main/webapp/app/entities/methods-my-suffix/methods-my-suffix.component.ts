import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { MethodsMySuffix } from './methods-my-suffix.model';
import { MethodsMySuffixService } from './methods-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-methods-my-suffix',
    templateUrl: './methods-my-suffix.component.html'
})
export class MethodsMySuffixComponent implements OnInit, OnDestroy {
methods: MethodsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private methodsService: MethodsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.methodsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.methods = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMethods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MethodsMySuffix) {
        return item.id;
    }
    registerChangeInMethods() {
        this.eventSubscriber = this.eventManager.subscribe('methodsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
