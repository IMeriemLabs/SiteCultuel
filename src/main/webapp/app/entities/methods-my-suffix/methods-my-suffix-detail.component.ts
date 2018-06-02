import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MethodsMySuffix } from './methods-my-suffix.model';
import { MethodsMySuffixService } from './methods-my-suffix.service';

@Component({
    selector: 'jhi-methods-my-suffix-detail',
    templateUrl: './methods-my-suffix-detail.component.html'
})
export class MethodsMySuffixDetailComponent implements OnInit, OnDestroy {

    methods: MethodsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private methodsService: MethodsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMethods();
    }

    load(id) {
        this.methodsService.find(id).subscribe((methods) => {
            this.methods = methods;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMethods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'methodsListModification',
            (response) => this.load(this.methods.id)
        );
    }
}
