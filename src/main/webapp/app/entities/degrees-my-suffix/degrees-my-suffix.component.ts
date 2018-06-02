import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { DegreesMySuffix } from './degrees-my-suffix.model';
import { DegreesMySuffixService } from './degrees-my-suffix.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-degrees-my-suffix',
    templateUrl: './degrees-my-suffix.component.html'
})
export class DegreesMySuffixComponent implements OnInit, OnDestroy {
degrees: DegreesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private degreesService: DegreesMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.degreesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.degrees = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDegrees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DegreesMySuffix) {
        return item.id;
    }
    registerChangeInDegrees() {
        this.eventSubscriber = this.eventManager.subscribe('degreesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
