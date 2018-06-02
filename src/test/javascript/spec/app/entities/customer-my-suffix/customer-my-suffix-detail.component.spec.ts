/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { SiteCultuelTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CustomerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix-detail.component';
import { CustomerMySuffixService } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from '../../../../../../main/webapp/app/entities/customer-my-suffix/customer-my-suffix.model';

describe('Component Tests', () => {

    describe('CustomerMySuffix Management Detail Component', () => {
        let comp: CustomerMySuffixDetailComponent;
        let fixture: ComponentFixture<CustomerMySuffixDetailComponent>;
        let service: CustomerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SiteCultuelTestModule],
                declarations: [CustomerMySuffixDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CustomerMySuffixService,
                    JhiEventManager
                ]
            }).overrideTemplate(CustomerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CustomerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CustomerMySuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.customer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
