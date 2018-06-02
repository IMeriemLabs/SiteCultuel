import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DegreesMySuffix } from './degrees-my-suffix.model';
import { DegreesMySuffixService } from './degrees-my-suffix.service';

@Component({
    selector: 'jhi-degrees-my-suffix-detail',
    templateUrl: './degrees-my-suffix-detail.component.html'
})
export class DegreesMySuffixDetailComponent implements OnInit, OnDestroy {

    degrees: DegreesMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private degreesService: DegreesMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDegrees();
    }

    load(id) {
        this.degreesService.find(id).subscribe((degrees) => {
            this.degrees = degrees;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDegrees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'degreesListModification',
            (response) => this.load(this.degrees.id)
        );
    }
}
